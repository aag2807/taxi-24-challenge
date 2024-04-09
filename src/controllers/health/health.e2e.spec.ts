import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, Provider } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthCheckService } from '../../core/health/services/health-check/health-check.service';

const mockHealthCheckServiceProvider: Provider =
  {
    provide: HealthCheckService,
    useValue: {
      isServiceHealthy: () => 'Ok',
      isDatabaseHealthy: () => 'Ok',
    } satisfies HealthCheckService,
  };

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [mockHealthCheckServiceProvider],
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