import { Comment } from '../interfaces/comment.interface';

export type CreateCommentDto = Omit<Comment, 'id' | 'created_at'>;
