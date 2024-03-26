import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from '../src/tasks/tasks.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /tasks', () => {
    it('return all tasks', async () => {
      const response = await request(app.getHttpServer()).get(`/tasks`);

      expect(response.statusCode).toBe(200);
      expect(response.body.tasks).toBeDefined();
    });
  });

  describe('GET /tasks/:id', () => {
    it('return task 1', async () => {
      const response = await request(app.getHttpServer()).get(`/tasks/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body.task).toBeDefined();
    });

    it('return error 404', async () => {
      const response = await request(app.getHttpServer()).get(`/tasks/100`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /tasks', () => {
    it('add new task', async () => {
      const newTask = {
        id: 3,
        description:
          'Given a string indicating a range of letters, return a string which includes all the letters in that range, including the last letter. Note that if the range is given in capital letters, return the string in capitals also!',
        incoming_example: 'a-z',
        outgoing_example: 'abcdefghijklmnopqrstuvwxyz',
        tags: ['111'],
        category: 1,
        additional_info: [
          'A hyphen will separate the two letters in the string.',
          "You don't need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).",
        ],
        score: 7,
        title: 'From A to Z',
      };
      const response = await request(app.getHttpServer())
        .post(`/tasks`)
        .send(newTask);

      expect(response.status).toBe(201);
      expect(response.body.task).toBeDefined();
    });

    it('return error 400', async () => {
      const newTask = {
        id: 3,
        incoming_example: 'a-z',
        outgoing_example: 'abcdefghijklmnopqrstuvwxyz',
        tags: ['111'],
        category: 1,
        additional_info: [
          'A hyphen will separate the two letters in the string.',
          "You don't need to worry about error handling in this kata (i.e. both letters will be the same case and the second letter will not be before the first alphabetically).",
        ],
        score: 7,
        title: 'From A to Z',
      };
      const response = await request(app.getHttpServer())
        .post(`/tasks`)
        .send(newTask);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('delete task 1', async () => {
      const response = await request(app.getHttpServer()).delete(`/tasks/1`);

      expect(response.status).toBe(200);
      expect(response.body.task_id).toBeDefined();
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    const newTask = {
      description:
        'Given a string indicating a range of letters, return a string which includes all the letters in that range, including the last letter. Note that if the range is given in capital letters, return the string in capitals also!',
    };

    it('update task 1', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/tasks/1`)
        .send(newTask);
      expect(response.status).toBe(200);
      expect(response.body.task).toBeDefined();
    });

    it('return error 404', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/tasks/100`)
        .send(newTask);
      expect(response.status).toBe(404);
    });
  });
});
