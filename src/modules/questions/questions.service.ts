import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Questions } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Questions> {
    return await this.prisma.questions.create({ data: createQuestionDto });
  }

  async find(id: number): Promise<Questions> {
    return await this.prisma.questions.findFirst({ where: { id } });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Questions> {
    return await this.prisma.questions.update({
      where: {
        id,
      },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({ where: { id } });
  }
}
