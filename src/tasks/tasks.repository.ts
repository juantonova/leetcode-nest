import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { CategoryType } from '../enums/categories';
import { Tag } from '../enums/tags';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksRepository {
  private tasks: Task[] = [
    {
      id: 1,
      description:
        'Given a string indicating a range of letters, return a string which includes all the letters in that range, including the last letter. Note that if the range is given in capital letters, return the string in capitals also!',
      incoming_example: 'a-z',
      outgoing_example: 'abcdefghijklmnopqrstuvwxyz',
      tags: [Tag.STRINGS],
      category: CategoryType.ALGORITHMS,
      additional_info: [
        'A hyphen will separate the two letters in the string.',
        "You don't need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).",
      ],
      score: 7,
      title: 'From A to Z',
    },
    {
      id: 2,
      description:
        'There is an array with some numbers. All numbers are equal except for one. Try to find it!',
      incoming_example: [1, 1, 1, 2, 1, 1],
      outgoing_example: 2,
      tags: [Tag.FUNDAMENTALS, Tag.ARRAYS],
      category: CategoryType.ARRAYS,
      additional_info: [
        'A hyphen will separate the two letters in the string.',
        "You don't need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).",
      ],
      score: 7,
      title: 'From A to Z',
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findOneById(id: string): Task | null {
    return this.tasks.find((t) => t.id === Number(id));
  }

  create(newTask: CreateTaskDto): Task {
    this.tasks.push({
      ...newTask,
      id: this.tasks.length,
    });

    return this.tasks.at(-1);
  }

  update(id: string, task: UpdateTaskDto): Task | null {
    const index = this.tasks.findIndex((t) => t.id === Number(id));
    if (index === -1) {
      return null;
    }
    this.tasks[index] = {
      ...this.tasks[index],
      ...task,
    };
    return this.tasks[index];
  }

  remove(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== Number(id));
  }
}
