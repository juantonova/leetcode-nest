import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SolutionsRepository } from './solutions.repository';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';

@Injectable()
export class SolutionsService {
  constructor(private readonly repository: SolutionsRepository) {}

  create(solution: CreateSolutionDto) {
    const { user_id, task_id, solution: result } = solution;
    if (!user_id || !task_id || !result) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const newSolution = this.repository.create(solution);
    return { solution: newSolution };
  }

  findAllByTaskId(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const solutions = this.repository.findAllByTaskId(id);
    if (!solutions) {
      throw new NotFoundException(NotFoundErrors.SOLUTION);
    }
    return { solutions };
  }
}
