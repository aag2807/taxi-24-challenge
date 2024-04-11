import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('HealthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [],
      controllers: [HealthController],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should return valid Response on GET /health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        api: 'Ok',
        database: 'Ok',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
