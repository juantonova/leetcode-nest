import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: CommentsRepository) {}

  findAllByTaskId(id: string) {
    const comments = this.repository.findAllByTaskId(id);
    return { comments };
  }

  create(createCommentDto: CreateCommentDto) {
    const { content, task_id, user_id } = createCommentDto;
    if (!content || task_id || user_id) {
      throw new BadRequestException('Invalid request');
    }
    const comment = this.repository.create(createCommentDto);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return { comment };
  }

  remove(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid request');
    }
    this.repository.remove(id);
    return { comment_id: id };
  }
}
