import { TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';
import { TestUtils } from '../../../common/testing/test.utils';

describe('PassangerService', () => {
  let service: PassengerService;

  beforeEach(async () => {
    const module: TestingModule = await  TestUtils.configureTestingModule({
      providers: [PassengerService],
    })

    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
