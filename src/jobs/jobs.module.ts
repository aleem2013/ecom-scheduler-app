import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    CacheModule.register({
        isGlobal: true,
      ttl: 60, // cache for 1 minute
      max: 100, // maximum number of items in cache
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}