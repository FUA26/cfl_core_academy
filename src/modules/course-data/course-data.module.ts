import { Module } from '@nestjs/common';
import { CourseDataService } from './course-data.service';
import { CourseDataController } from './course-data.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseDataController],
  providers: [CourseDataService, PrismaModule],
})
export class CourseDataModule {}
