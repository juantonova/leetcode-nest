import { Injectable } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  private comments: Comment[] = [
    {
      id: 1,
      user_id: 1,
      task_id: 1,
      content: "I'm done",
      created_at: '2021-07-19T00:00:00.000Z',
    },
    {
      id: 2,
      user_id: 2,
      task_id: 1,
      content: 'Me too',
      created_at: '2022-07-19T00:00:00.000Z',
    },
    {
      id: 3,
      user_id: 2,
      task_id: 2,
      content: 'Can you help me with this one?',
      created_at: '2022-07-19T00:00:00.000Z',
    },
    {
      id: 4,
      user_id: 1,
      task_id: 2,
      content: 'Sure, I can help you',
      created_at: '2022-07-20T00:00:00.000Z',
    },
  ];

  findAllByTaskId(id: string): Comment[] {
    return this.comments.filter((c) => c.task_id === Number(id));
  }

  create(newComment: CreateCommentDto): Comment {
    this.comments.push({
      ...newComment,
      id: this.comments.length,
      created_at: new Date().toISOString(),
    });

    return this.comments.at(-1);
  }

  remove(id: string) {
    this.comments = this.comments.filter((c) => c.id !== Number(id));
  }
}
