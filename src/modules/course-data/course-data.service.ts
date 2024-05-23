import { Injectable } from '@nestjs/common';
import { CreateCourseDatumDto } from './dto/create-course-datum.dto';
import { UpdateCourseDatumDto } from './dto/update-course-datum.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CourseData } from '@prisma/client';

@Injectable()
export class CourseDataService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCourseDatumDto: CreateCourseDatumDto,
  ): Promise<CourseData> {
    return await this.prisma.courseData.create({
      data: createCourseDatumDto,
    });
  }

  async find(id: string): Promise<CourseData> {
    return await this.prisma.courseData.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateCourseDatumDto: UpdateCourseDatumDto,
  ): Promise<CourseData> {
    return await this.prisma.courseData.update({
      where: {
        id,
      },
      data: updateCourseDatumDto,
    });
  }

  async remove(id: string): Promise<CourseData> {
    return await this.prisma.courseData.delete({ where: { id } });
  }
}
