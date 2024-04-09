import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solution)
    private repository: Repository<Solution>,
  ) {}

  async create(solution: CreateSolutionDto) {
    const { user_id, task_id, solution: result } = solution;
    if (!user_id || !task_id || !result) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const newSolution = await this.repository.save(solution);
    return { solution: newSolution };
  }

  async findAllByTaskId(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const solutions = await this.repository.findBy({ task_id: Number(id) });
    if (!solutions) {
      throw new NotFoundException(NotFoundErrors.SOLUTION);
    }
    return { solutions };
  }
}
