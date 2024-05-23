import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IJwtPayload } from 'src/shared/types/auth.types';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(
    user: IJwtPayload,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return await this.prisma.review.create({
      data: {
        userId: user.sub,
        rating: createReviewDto.rating,
        review: createReviewDto.review,
        courseId: createReviewDto.courseId,
      },
    });
  }

  async find(id: string): Promise<Review[]> {
    return await this.prisma.review.findMany({
      where: {
        courseId: id,
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.review.delete({ where: { id } });
  }
}
