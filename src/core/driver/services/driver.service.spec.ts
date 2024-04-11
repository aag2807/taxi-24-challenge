import { TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { TestUtils } from '../../../common/testing/test.utils';
import { DriverRepository } from '../../../boundaries/persistance/repositories/driver/driver.repository';
import { CreateDriver } from '../aggregates/createDriver.aggregate';

describe('DriverService', () => {
  let service: DriverService;
  let driverRepository: DriverRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      providers: [DriverService],
    });

    service = module.get<DriverService>(DriverService);
    driverRepository = module.get<DriverRepository>(DriverRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create new instances of a driver', async () => {
    const aggregate = new CreateDriver();
    aggregate.email = 'randome@email.com';
    aggregate.fullName = 'John Doe';
    aggregate.licenseNumber = 'license-number';
    aggregate.phoneNumber = '1234567890';

    const driver = await service.createDriver(aggregate);
    const driversInDb = await driverRepository.readAll();

    expect(driver).toBeDefined();
    expect(driversInDb).toHaveLength(1);
    expect(driversInDb[0].email).toBe('randome@email.com');
    expect(driversInDb[0].fullName).toBe('John Doe');
    expect(driversInDb[0].phoneNumber).toBe('1234567890');
    expect(driversInDb[0].licenseNumber).toBe('license-number');
  });


  it('should throw exception when aggregate is null', async () => {
    await expect(service.createDriver(null)).rejects.toThrow();
  });

  it('should throw exception when fullName is null', async () => {
    const aggregate = new CreateDriver();
    aggregate.fullName = '';
    aggregate.email = '';
    aggregate.phoneNumber = '';
    aggregate.licenseNumber = '';

    await expect(service.createDriver(aggregate)).rejects.toThrow();
  });

  it('should bring all instances of drivers', async () => {
    await driverRepository.create({
      email: 'unique-email-1@gmail.com',
      fullName: 'John Doe',
      isActive: true,
      licenseNumber: 'license-number-1',
      phoneNumber: '1234567890',
    });

    const drivers = await service.getDrivers();

    expect(drivers).toHaveLength(1);
  });

  it('should only get active drivers', async () => {
    await createDummyDrivers();

    const drivers = await service.getAllActiveDrivers();

    expect(drivers).toHaveLength(1);
  });

  it('should get driver by id', async () => {
    await createDummyDrivers();

    const driver = await service.getDriverById(1);

    expect(driver).toBeDefined();
    expect(driver.fullName).toBe('John Doe');
    expect(driver.driverId).toBe(1);
  });

  it('should get drivers in a radius', async () => {
    const mockDrivers = [
      {
        driverId: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        licenseNumber: 'D12345',
        phoneNumber: '5551234567',
        isActive: true,
        location: '34.0522,-118.2437', // Los Angeles
        trips: [],
      },
      {
        driverId: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        licenseNumber: 'D67890',
        phoneNumber: '5557654321',
        isActive: false,
        location: '1.00,15.00', // africa
        trips: [],
      }
    ];
    mockDrivers.forEach(async (driver) => await driverRepository.create(driver) )

    const activeDrivers = await service.getDriversInKmRadius(34.0522, -118.2437, 3000);

    expect(activeDrivers).toHaveLength(1);
    expect(activeDrivers[0].driverId).toBe(1);
    expect(activeDrivers[0].fullName).toBe('John Doe');
  })

  const createDummyDrivers = async () => {
    await driverRepository.create({
      email: 'unique-email-1@gmail.com',
      fullName: 'John Doe',
      isActive: true,
      licenseNumber: 'license-number-1',
      phoneNumber: '1234567890',
    });
    await driverRepository.create({
      email: 'unique-email-2@gmail.com',
      fullName: 'Mary Jane',
      isActive: false,
      licenseNumber: 'license-number-2',
      phoneNumber: '0987654321',
    });
  };
});
