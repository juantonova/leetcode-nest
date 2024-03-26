import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  create(task: CreateTaskDto) {
    const {
      description,
      incoming_example,
      outgoing_example,
      tags,
      category,
      additional_info,
      score,
      title,
    } = task;
    if (
      !description ||
      !incoming_example ||
      !outgoing_example ||
      !tags ||
      !category ||
      !additional_info ||
      !score ||
      !title
    ) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const newTask = this.repository.create(task);
    return { task: newTask };
  }

  findAll() {
    const tasks = this.repository.findAll();
    return { tasks };
  }

  findOne(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const task = this.repository.findOneById(id);
    if (!task) {
      throw new NotFoundException(NotFoundErrors.TASK);
    }
    return { task };
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const task = this.repository.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(NotFoundErrors.TASK);
    }
    return { task };
  }

  remove(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    this.repository.remove(id);
    return { task_id: id };
  }
}
