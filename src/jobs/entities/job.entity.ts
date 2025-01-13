import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JobStatus } from '../enums/job-status.enum';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  parameters: Record<string, any>;

  @Column()
  cronExpression: string;

  @Column({ type: 'timestamp' })
  lastRunAt: Date;

  @Column({ type: 'timestamp' })
  nextRunAt: Date;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.SCHEDULED
  })
  status: JobStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}