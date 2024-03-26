import { Task } from '../interfaces/task.interface';

export type CreateTaskDto = Omit<Task, 'id'>;
