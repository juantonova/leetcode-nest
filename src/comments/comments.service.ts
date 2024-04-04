import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BadRequestErrors, NotFoundErrors } from '../enums/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
  ) {}

  async findAllByTaskId(id: string) {
    const comments = await this.repository.findBy({ task_id: Number(id) });
    return { comments };
  }

  async create(createCommentDto: CreateCommentDto) {
    const { content, task_id, user_id } = createCommentDto;
    if (!content || !task_id || !user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const comment = {
      ...createCommentDto,
      created_at: new Date().toDateString(),
    };
    const newComment = await this.repository.save(comment);
    if (!newComment) {
      throw new NotFoundException(NotFoundErrors.COMMENT);
    }
    return { comment: newComment };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const comment = await this.repository.findBy({ id: Number(id) });
    if (comment) {
      await this.repository.remove(comment);
    }
    return { comment_id: id };
  }
}
