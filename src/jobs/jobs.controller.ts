import { Controller, Get, Post, Body, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('jobs')
@Controller('jobs')
@UseInterceptors(CacheInterceptor)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'Return all jobs' })
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by id' })
  @ApiResponse({ status: 200, description: 'Return a job by id' })
  findOne(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }
}