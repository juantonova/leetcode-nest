import { Rating } from '../interfaces/rating.interface';

export type CreateRatingDto = Omit<Rating, 'id'>;
