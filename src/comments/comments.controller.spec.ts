import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, CommentsRepository],
    }).compile();

    controller = app.get<CommentsController>(CommentsController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('GET /api/comments/:id', () => {
    it('return data for task 1', async () => {
      const response = await controller.findOne('1');

      expect(response.comments).toBeDefined();
    });
  });

  describe('DELETE /api/comments/:id', () => {
    it('return data for task 1', async () => {
      const response = await controller.remove('1');
      expect(response.comment_id).toBeDefined();
    });
  });

  describe('POST /api/comments/:id', () => {
    it('return data for task 1', async () => {
      const response = await controller.create({
        task_id: 1,
        user_id: 1,
        content: 'test',
      });
      expect(response.comment).toBeDefined();
    });
  });
});
