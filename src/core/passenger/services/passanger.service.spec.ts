import { TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';
import { TestUtils } from '../../../common/testing/test.utils';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { DriverService } from '../../driver/services/driver.service';

describe('PassangerService', () => {
  let service: PassengerService;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await  TestUtils.configureTestingModule({
      providers: [PassengerService, DriverService],
    });

    service = module.get<PassengerService>(PassengerService);
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
