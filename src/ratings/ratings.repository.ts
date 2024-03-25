import { Injectable } from '@nestjs/common';
import { Rating } from './interfaces/rating.interface';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsRepository {
  private ratings: Rating[] = [
    {
      id: 1,
      user_id: 1,
      task_id: 1,
      rating: 5,
    },
    {
      id: 2,
      user_id: 1,
      task_id: 2,
      rating: 1,
    },
    {
      id: 3,
      user_id: 2,
      task_id: 2,
      rating: 3,
    },
    {
      id: 4,
      user_id: 1,
      task_id: 2,
      rating: 3,
    },
  ];

  findAllByTaskId(id: string): Rating[] {
    return this.ratings.filter((c) => c.task_id === Number(id));
  }

  create(newRating: CreateRatingDto): Rating {
    this.ratings.push({
      ...newRating,
      id: this.ratings.length,
    });

    return this.ratings.at(-1);
  }
}
