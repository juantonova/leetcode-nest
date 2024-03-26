import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './ratings.repository';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository],
  exports: [RatingsService],
})
export class RatingsModule {}
