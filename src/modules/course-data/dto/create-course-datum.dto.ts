import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCourseDatumDto {
  @ApiProperty({ example: 'What is NestJs?' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Detailed explanation about NestJs framework' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'http://example.com/video.mp4' })
  @IsUrl()
  @IsOptional()
  videoUrl: string;

  @ApiProperty({ example: 'http://example.com/thumbnail.jpg' })
  @IsUrl()
  @IsOptional()
  videoThumbnail: string;

  @ApiProperty({ example: 'Introduction' })
  @IsString()
  @IsOptional()
  videoSection: string;

  @ApiProperty({ example: 300 })
  @IsNumber()
  @IsOptional()
  videoLength: number;

  @ApiProperty({ example: 'YouTube' })
  @IsString()
  @IsOptional()
  videoPlayer: string;

  @ApiProperty({ example: 'http://example.com/related' })
  @IsString()
  @IsOptional()
  links: string;

  @ApiProperty({ example: '123123-sadas231-sdasd12321' })
  @IsString()
  @IsNotEmpty()
  courseId: string;
}
