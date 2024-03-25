import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  private updateUserInfoForResponse(user: User): FindUserDto {
    const { id, role, name, rating, permissions } = user;
    return { id, role, name, rating, permissions };
  }

  findAll() {
    const users = this.repository.findAll();
    return { users: users.map(this.updateUserInfoForResponse) };
  }

  findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    const user = this.repository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user: this.updateUserInfoForResponse(user) };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    const user = this.repository.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user: this.updateUserInfoForResponse(user) };
  }

  remove(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    this.repository.remove(id);
    return { user_id: id };
  }
}
