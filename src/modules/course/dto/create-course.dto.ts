import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'NestJs Framework' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'A comprehensive course on NestJs Framework' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'Web Development' })
  @IsNotEmpty()
  @IsString()
  categories: string;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 120 })
  @IsNumber()
  @IsOptional()
  estimatedPrice: number;

  @ApiProperty({ example: 'http://example.com/thumbnail.jpg' })
  @IsString()
  @IsUrl()
  @IsOptional()
  thumbnail: string;

  @ApiProperty({ example: 'nestjs,framework,backend' })
  @IsString()
  @IsOptional()
  tags: string;

  @ApiProperty({ example: 'Beginner' })
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty({ example: 'http://example.com/demo' })
  @IsString()
  @IsUrl()
  @IsOptional()
  demoUrl: string;

  @ApiProperty({
    example: 'Learn the basics of NestJs, Improve your backend skills',
  })
  @IsString()
  @IsOptional()
  benefits: string;

  @ApiProperty({ example: 'Basic understanding of Node.js' })
  @IsString()
  @IsOptional()
  prerequisites: string;
}
