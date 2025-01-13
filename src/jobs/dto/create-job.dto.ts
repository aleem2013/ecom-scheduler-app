import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cronExpression: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  parameters?: Record<string, any>;
}