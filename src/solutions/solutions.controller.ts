import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Get(':user_id')
  findAllByUserId(@Param('user_id') id: string) {
    return this.solutionsService.findAllByUserId(id);
  }

  @Get()
  findOneByUserId(
    @Query() { user_id, task_id }: { user_id: string; task_id: string },
  ) {
    return this.solutionsService.findOneByUserId(user_id, task_id);
  }

  @Post()
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionsService.create(createSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(id);
  }
}
