import { PartialType } from '@nestjs/swagger';
import { CreateCourseDatumDto } from './create-course-datum.dto';

export class UpdateCourseDatumDto extends PartialType(CreateCourseDatumDto) {}
