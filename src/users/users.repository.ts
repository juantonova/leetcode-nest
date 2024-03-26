import { Injectable } from '@nestjs/common';
import { PermissionAction } from '../enums/permissions';
import { User } from './interfaces/user.interface';
import { Role } from '../enums/roles';
import { UpdateUserDto } from './dto/update-user.dto';

const adminPermissions = Object.values(PermissionAction);
const userPermissions = [
  PermissionAction.READ_TASK,
  PermissionAction.CREATE_COMMENT,
];
const interviewerPermissions = [
  PermissionAction.READ_TASK,
  PermissionAction.READ_USER,
  PermissionAction.DELETE_TASK,
  PermissionAction.CREATE_COMMENT,
];

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      role: Role.ADMIN,
      name: 'Юрий',
      login: 'admin',
      password: 'admin',
      permissions: adminPermissions,
    },
    {
      id: 2,
      role: Role.USER,
      name: 'Аркадий',
      login: 'user',
      password: 'user',
      rating: 5,
      permissions: userPermissions,
    },
    {
      id: 3,
      role: Role.INTERVIEWER,
      name: 'Василий',
      login: 'interviewer',
      password: 'interviewer',
      permissions: interviewerPermissions,
    },
    {
      id: 4,
      role: Role.USER,
      name: 'Виктория',
      login: 'user',
      password: 'user',
      rating: 4,
      permissions: userPermissions,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: string): User | null {
    return this.users.find((u) => u.id === Number(id));
  }

  update(id: string, user: UpdateUserDto): User | null {
    const index = this.users.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      return null;
    }
    this.users[index] = {
      ...this.users[index],
      ...user,
    };
    return this.users[index];
  }

  remove(id: string) {
    this.users = this.users.filter((u) => u.id !== Number(id));
  }
}
