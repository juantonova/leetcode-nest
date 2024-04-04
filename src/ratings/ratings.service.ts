import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private repository: Repository<Rating>,
  ) {}

  async findAllByTaskId(id: string) {
    const rating = await this.repository.findBy({
      task_id: Number(id),
    });
    const totalRating =
      rating.reduce((acc, curr) => acc + curr.rating, 0) / rating.length;
    return { rating: totalRating };
  }

  async create(createRatingDto: CreateRatingDto) {
    const { rating, task_id, user_id } = createRatingDto;
    if (!rating || !task_id || !user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const newRating = await this.repository.save(createRatingDto);
    if (!newRating) {
      throw new NotFoundException(NotFoundErrors.RATING);
    }
    return { rating: newRating };
  }
}
