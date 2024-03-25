import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get(':task_id')
  findAllByTaskId(@Param('task_id') id: string) {
    return this.ratingsService.findAllByTaskId(id);
  }

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }
}
