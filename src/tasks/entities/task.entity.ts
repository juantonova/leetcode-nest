import { CategoryType } from 'src/enums/categories';
import { Tag } from 'src/enums/tags';

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  incoming_example: unknown;

  @Column({ type: 'varchar' })
  outgoing_example: unknown;

  @Column('enum', { enum: Tag, array: true })
  tags: Tag[];

  @Column({ type: 'varchar', enum: CategoryType })
  category: CategoryType;

  @Column({ type: 'varchar', array: true })
  additional_info?: string[];

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'varchar' })
  title: string;
}
