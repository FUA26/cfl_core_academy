import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseDataService } from './course-data.service';
import { CreateCourseDatumDto } from './dto/create-course-datum.dto';
import { UpdateCourseDatumDto } from './dto/update-course-datum.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseData } from '@prisma/client';

@ApiTags('Course Data')
@Controller('course-data')
export class CourseDataController {
  constructor(private readonly courseDataService: CourseDataService) {}

  @Post()
  @ApiOperation({ description: 'Create Course Data' })
  @ApiBody({ type: CreateCourseDatumDto })
  @ApiResponse({
    status: 201,
    description: 'The course data has been successfully created.',
  })
  async create(
    @Body() createCourseDatumDto: CreateCourseDatumDto,
  ): Promise<CourseData> {
    return this.courseDataService.create(createCourseDatumDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single Course Data' })
  async find(@Param('id') id: string): Promise<CourseData> {
    return this.courseDataService.find(id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update Course Data' })
  @ApiBody({ type: UpdateCourseDatumDto })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDatumDto: UpdateCourseDatumDto,
  ): Promise<CourseData> {
    return this.courseDataService.update(id, updateCourseDatumDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Course Data' })
  async remove(@Param('id') id: string) {
    return this.courseDataService.remove(id);
  }
}
