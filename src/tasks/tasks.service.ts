import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './interfaces/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  create(task: Omit<Task, 'id'>) {
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
      throw new BadRequestException('Invalid request');
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
      throw new BadRequestException('Invalid request');
    }
    const task = this.repository.findOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return { task };
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    const task = this.repository.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return { task };
  }

  remove(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    this.repository.remove(id);
    return { task_id: id };
  }
}
