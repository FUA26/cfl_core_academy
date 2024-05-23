import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Questions } from '@prisma/client';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ description: 'Create Questions' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({
    status: 201,
    description: 'The question has been successfully created.',
  })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    return this.questionsService.create(createQuestionDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get All Questions' })
  async find(@Param('id') id: string): Promise<Questions> {
    return this.questionsService.find(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update Questions' })
  @ApiBody({ type: UpdateQuestionDto })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Questions> {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Questions' })
  async remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
