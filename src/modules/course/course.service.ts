import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Course } from '@prisma/client';
import { Logger } from 'winston';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll(): Promise<Course[]> {
    return await this.prisma.course.findMany();
  }

  async findOne(id: string): Promise<Course> {
    return await this.prisma.course.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return await this.prisma.course.update({
      where: {
        id,
      },
      data: updateCourseDto,
    });
  }

  async remove(id: string): Promise<Course> {
    return await this.prisma.course.delete({ where: { id } });
  }
}
