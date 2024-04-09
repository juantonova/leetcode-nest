import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionAction } from '../../enums/permissions';
import { Role } from '../../enums/roles';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', enum: Role })
  role: Role;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  login: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column('enum', { enum: PermissionAction, array: true })
  permissions: PermissionAction[];
}
