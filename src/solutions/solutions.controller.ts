import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Get(':task_id')
  findAllByTaskId(@Param('task_id') id: string) {
    return this.solutionsService.findAllByTaskId(id);
  }

  @Post()
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionsService.create(createSolutionDto);
  }
}
