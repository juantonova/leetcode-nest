import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { SolutionsRepository } from './solutions.repository';

@Module({
  controllers: [SolutionsController],
  providers: [SolutionsService, SolutionsRepository],
  exports: [SolutionsService],
})
export class SolutionsModule {}
