import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is NestJs?' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsNotEmpty()
  @IsString()
  courseDataId: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  parentQuestionId?: number;
}
