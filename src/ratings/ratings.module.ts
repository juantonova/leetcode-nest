import { Module } from '@nestjs/common';
import { RatingsService } from './Ratings.service';
import { RatingsController } from './Ratings.controller';
import { RatingsRepository } from './Ratings.repository';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository],
  exports: [RatingsService],
})
export class RatingsModule {}
