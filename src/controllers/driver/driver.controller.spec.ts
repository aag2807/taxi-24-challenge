import { TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { TestUtils } from '../../common/testing/test.utils';
import { DriverService } from '../../core/driver/services/driver.service';

describe('DriverController', () => {
  let controller: DriverController;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [DriverController],
      providers: [DriverService],
    });

    controller = module.get<DriverController>(DriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
