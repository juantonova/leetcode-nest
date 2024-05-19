import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { FindUserDto } from './dto/find-user.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  private updateUserInfoForResponse(user: User): FindUserDto {
    const { id, role, name, rating, permissions } = user;
    return { id, role, name, rating, permissions };
  }

  async findAll() {
    const users = await this.repository.find();
    return { users: users.map(this.updateUserInfoForResponse) };
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const user = await this.repository.findOneBy({ id: Number(id) });
    if (!user) {
      throw new NotFoundException(NotFoundErrors.USER);
    }
    return { user: this.updateUserInfoForResponse(user) };
  }

  async create(user: CreateUserDto) {
    const { role, name, login, password, permissions, rating } = user;
    if (!role || !name || !login || !password || !permissions || !rating) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const newUser = await this.repository.save(user);
    return { task: newUser };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!id || !updateUserDto) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    await this.repository.update(id, updateUserDto);
    const user = await this.repository.findOneBy({ id: Number(id) });
    if (!user) {
      throw new NotFoundException(NotFoundErrors.USER);
    }
    return { user: this.updateUserInfoForResponse(user) };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const user = await this.repository.findOneBy({ id: Number(id) });
    if (user) {
      await this.repository.remove(user);
    }
    return { user_id: id };
  }
}
