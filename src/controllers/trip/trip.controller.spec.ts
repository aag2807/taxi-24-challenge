import { TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TestUtils } from '../../common/testing/test.utils';

describe('TripController', () => {
  let controller: TripController;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [TripController],
    });

    controller = module.get<TripController>(TripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
