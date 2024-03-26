import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SolutionsModule } from '../src/solutions/solutions.module';

describe('SolutionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SolutionsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /solutions/:id', () => {
    it('return data for task 1', async () => {
      const response = await request(app.getHttpServer()).get(`/solutions/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body.solutions).toBeDefined();
    });
  });

  describe('POST /solutions', () => {
    it('return data with new solution', async () => {
      const newSolution = {
        task_id: 1,
        user_id: 1,
        solution: 'New solution',
      };
      const response = await request(app.getHttpServer())
        .post(`/solutions`)
        .send(newSolution);

      expect(response.statusCode).toBe(201);
      expect(response.body.solution).toBeDefined();
    });
  });
});
