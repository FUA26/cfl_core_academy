import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { User } from 'src/shared/decorators/user.decorator';
import { IJwtPayload } from 'src/shared/types/auth.types';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ description: 'Create Course' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
  })
  async create(
    @User() user: IJwtPayload,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.create(user, createReviewDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get All Review by Course Id' })
  async find(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.find(id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update Review' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Review' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
