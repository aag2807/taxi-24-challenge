import { Test, TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { TestUtils } from '../../common/testing/test.utils';

describe('PassengerController', () => {
  let controller: PassengerController;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [PassengerController],
    });

    controller = module.get<PassengerController>(PassengerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
