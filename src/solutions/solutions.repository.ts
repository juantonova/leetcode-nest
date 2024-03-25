import { Injectable } from '@nestjs/common';
import { Solution } from './interfaces/solution.interface';
import { CreateSolutionDto } from './dto/create-solution.dto';

@Injectable()
export class SolutionsRepository {
  private solutions: Solution[] = [
    {
      id: 1,
      user_id: 1,
      task_id: 1,
      solution: '() => console.log("Hello, world!")',
    },
    {
      id: 2,
      user_id: 2,
      task_id: 2,
      solution: '() => return 1 + 1',
    },
  ];

  findAllByTaskId(id: string): Solution[] {
    return this.solutions.filter((t) => t.id === Number(id));
  }

  create(newSolution: CreateSolutionDto): Solution {
    this.solutions.push({
      ...newSolution,
      id: this.solutions.length,
    });

    return this.solutions.at(-1);
  }
}
