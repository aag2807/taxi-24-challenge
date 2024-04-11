import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, Provider } from '@nestjs/common';
import { HealthController } from './health.controller';


describe('Cats', () => {
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