import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus } from './enums/job-status.enum';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      status: JobStatus.SCHEDULED,
      lastRunAt: new Date(),
      nextRunAt: new Date(),
    });

    const savedJob = await this.jobRepository.save(job);
    this.scheduleJob(savedJob);
    return savedJob;
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  private scheduleJob(job: Job): void {
    const cronJob = new CronJob(job.cronExpression, async () => {
      // Execute the job
      await this.executeJob(job);
    });

    this.schedulerRegistry.addCronJob(job.id, cronJob);
    cronJob.start();
  }

  private async executeJob(job: Job): Promise<void> {
    try {
      // Update job status to running
      job.status = JobStatus.RUNNING;
      await this.jobRepository.save(job);

      // Simulate job execution (replace with actual job logic)
      console.log(`Executing job: ${job.name}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update job execution details
      job.lastRunAt = new Date();
      job.nextRunAt = new Date(new Date().getTime() + 60000); // Example: next run in 1 minute
      job.status = JobStatus.COMPLETED;
      await this.jobRepository.save(job);
    } catch (error) {
      job.status = JobStatus.FAILED;
      await this.jobRepository.save(job);
      throw error;
    }
  }
}