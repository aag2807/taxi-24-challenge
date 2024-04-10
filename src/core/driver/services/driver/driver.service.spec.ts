import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { TestUtils } from '../../../../common/testing/test.utils';
import { DriverRepository } from '../../../../boundaries/persistance/repositories/driver/driver.repository';
import { Driver } from '../../models/driver.entity';


const createMockDriver = (): Partial<Driver> => ({
  email: 'unique-email-1@gmail.com',
  fullName: 'John Doe',
  isActive: true,
  licenseNumber: 'license-number-1',
  phoneNumber: '1234567890'
})

describe('DriverService', () => {
  let service: DriverService;
  let driverRepository: DriverRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({});

    service = module.get<DriverService>(DriverService);
    driverRepository = module.get<DriverRepository>(DriverRepository);
    await driverRepository.create(createMockDriver());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
