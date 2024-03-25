import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SolutionsRepository } from './solutions.repository';
import { CreateSolutionDto } from './dto/create-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(private readonly repository: SolutionsRepository) {}

  create(solution: CreateSolutionDto) {
    const { user_id, task_id, solution: result } = solution;
    if (!user_id || !task_id || !result) {
      throw new BadRequestException('Invalid request');
    }

    const newSolution = this.repository.create(solution);
    return { solution: newSolution };
  }

  findAllByTaskId(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    const solution = this.repository.findAllByTaskId(id);
    if (!solution) {
      throw new NotFoundException('Solution not found');
    }
    return { solution };
  }
}
