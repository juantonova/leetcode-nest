import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async create(task: CreateTaskDto) {
    const {
      description,
      incoming_example,
      outgoing_example,
      tags,
      additional_info,
      score,
      title,
    } = task;
    if (
      !description ||
      !incoming_example ||
      !outgoing_example ||
      !tags ||
      !additional_info ||
      !score ||
      !title
    ) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const newTask = await this.repository.save(task);
    return { task: newTask };
  }

  async findAll() {
    const tasks = await this.repository.find();
    return { tasks };
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const task = await this.repository.findOneBy({ id: Number(id) });
    if (!task) {
      throw new NotFoundException(NotFoundErrors.TASK);
    }
    return { task };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    if (!id || !updateTaskDto) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    await this.repository.update(id, updateTaskDto);
    const newTask = await this.repository.findOneBy({ id: Number(id) });
    if (!newTask) {
      throw new NotFoundException(NotFoundErrors.TASK);
    }
    return { task: newTask };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const task = await this.repository.findOneBy({ id: Number(id) });
    if (task) {
      await this.repository.remove(task);
    }
    return { task_id: id };
  }
}
