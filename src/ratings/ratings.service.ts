import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RatingsRepository } from '../ratings/ratings.repository';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly repository: RatingsRepository) {}

  findAllByTaskId(id: string) {
    const ratings = this.repository.findAllByTaskId(id);
    return { ratings };
  }

  create(createRatingDto: CreateRatingDto) {
    const { rating, task_id, user_id } = createRatingDto;
    if (!rating || task_id || user_id) {
      throw new BadRequestException('Invalid request');
    }
    const newRating = this.repository.create(createRatingDto);
    if (!newRating) {
      throw new NotFoundException('rating not found');
    }
    return { rating: newRating };
  }
}
