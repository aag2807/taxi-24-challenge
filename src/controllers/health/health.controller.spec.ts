import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TestUtils } from '../../common/testing/test.utils';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [HealthController],
    });

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a health object', () => {
    expect(controller.getHealth()).toEqual({
      api: 'Ok',
      database: 'Ok',
    });
  });
});
