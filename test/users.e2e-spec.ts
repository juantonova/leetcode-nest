import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /users', () => {
    it('return all users', async () => {
      const response = await request(app.getHttpServer()).get(`/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('return user 1', async () => {
      const response = await request(app.getHttpServer()).get(`/users/1`);
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
    });

    it('return error 404', async () => {
      const response = await request(app.getHttpServer()).get(`/users/100`);

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /users', () => {
    it('delete user 1', async () => {
      const response = await request(app.getHttpServer()).delete(`/users/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body.user_id).toBeDefined();
    });
  });

  describe('PATCH /users/:id', () => {
    const updatedData = { rating: 5 };

    it('update user 1', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/1`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
    });

    it('return error 404', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/100`)
        .send(updatedData);

      expect(response.statusCode).toBe(404);
    });
  });
});
