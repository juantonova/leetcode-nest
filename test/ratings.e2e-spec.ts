import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RatingsModule } from '../src/ratings/ratings.module';

describe('RatingsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RatingsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /ratings/:task_id', () => {
    it('return rating for task 2', async () => {
      const response = await request(app.getHttpServer()).get('/ratings/2');
      expect(response.status).toBe(200);
      expect(response.body.ratings).toBeDefined();
    });
  });

  describe('POST /ratings', () => {
    const newRating = {
      user_id: 5,
      task_id: 2,
      rating: 3,
    };

    it('return rating for new task', async () => {
      const response = await request(app.getHttpServer())
        .post('/ratings')
        .send(newRating);
      expect(response.status).toBe(201);
      expect(response.body.rating).toBeDefined();
    });
  });
});
