import { PermissionAction } from 'src/enums/permissions';
import { Role } from 'src/enums/roles';

export type CreateUserDto = {
  role: Role;
  name: string;
  login: string;
  password: string;
  permissions: PermissionAction[];
  rating: number;
};
