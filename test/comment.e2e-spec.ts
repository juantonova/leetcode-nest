import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommentsModule } from '../src/comments/comments.module';

describe('CommentController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommentsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /comments/:id', () => {
    it('return data for task 1', async () => {
      const response = await request(app.getHttpServer()).get(`/comments/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body.comments).toBeDefined();
    });

    it('return error 404 without comments', async () => {
      const response = await request(app.getHttpServer()).get('/comments/');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST /api/comments/', () => {
    it('return data with newTask', async () => {
      const newComment = {
        task_id: 1,
        user_id: 1,
        content: 'New comment',
        created_at: new Date().toISOString(),
      };

      const response = await request(app.getHttpServer())
        .post(`/comments`)
        .send(newComment);

      expect(response.statusCode).toBe(201);
      expect(response.body.comment).toBeDefined();
    });

    it('return error 400 with invalid data', async () => {
      const newComment = {
        user_id: 1,
        content: 'New comment',
        created_at: new Date().toISOString(),
      };
      const response = await request(app.getHttpServer())
        .post('/comments')
        .send(newComment);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /api/comments/:id', () => {
    it('return data with comment 1', async () => {
      const response = await request(app.getHttpServer()).delete(`/comments/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body.comment_id).toBeDefined();
    });
  });
});
