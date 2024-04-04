import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  content: string;

  @Column({ type: 'date' })
  created_at: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ type: 'integer' })
  task_id: number;
}
