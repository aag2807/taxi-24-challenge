import { TestingModule } from '@nestjs/testing';
import { PassengerService } from './passenger.service';
import { TestUtils } from '../../../common/testing/test.utils';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { DriverService } from '../../driver/services/driver.service';
import { LocationPoint } from '../../../common/models/location-point.model';
import { DriverRepository } from '../../../boundaries/persistance/repositories/driver/driver.repository';
import { GetClosesDriversRequest } from '../models/aggregates/get-closest-drivers.aggregate';

describe('PassengerService', () => {
  let service: PassengerService;
  let passengerRepository: PassengerRepository;
  let driverRepository: DriverRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      providers: [PassengerService, DriverService],
    });

    service = module.get<PassengerService>(PassengerService);
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
    driverRepository = module.get<DriverRepository>(DriverRepository);
  });

  it('should return an empty array if no passengers exist', async () => {
    const result = await service.getAllPassengers();

    expect(result).toEqual([]);
  });

  it('should return all passengers available', async () => {
    await passengerRepository.create({ fullName: 'John Doe', email: 'john@doe.com', phoneNumber: '1234567890' });

    const result = await service.getAllPassengers();

    expect(result).toHaveLength(1);
    expect(result[0].fullName).toEqual('John Doe');
  });

  it('should return a passenger by id', async () => {
    await passengerRepository.create({ fullName: 'John Doe', email: 'john@doe.com', phoneNumber: '1234567890' });

    const result = await service.getPassengerById(1);

    expect(result.fullName).toEqual('John Doe');
  });

  it('should throw an error if id is less than 1', async () => {
    await expect(service.getPassengerById(0)).rejects.toThrow('id must be greater than 0');
  });

  it('should throw an error if passenger does not exist', async () => {
    await expect(service.getPassengerById(1)).rejects.toThrow('Passenger not found');
  });

  it('should return 3 closest drivers to passenger location', async () => {
    await driverRepository.create({
      email: 'unique-email-1@gmail.com',
      fullName: 'Driver 1',
      isActive: true,
      licenseNumber: 'license-number-1',
      phoneNumber: '1234567890',
      location: new LocationPoint(0, 0),
    });
    await driverRepository.create({
      email: 'unique-email-1@gmail.com',
      fullName: 'Driver 2',
      isActive: true,
      licenseNumber: 'license-number-1',
      phoneNumber: '1234567890',
      location: new LocationPoint(0, 0),
    });
    await driverRepository.create({
      email: 'unique-email-1@gmail.com',
      fullName: 'Driver 3',
      isActive: true,
      licenseNumber: 'license-number-1',
      phoneNumber: '1234567890',
      location: new LocationPoint(0, 0),
    });
    await driverRepository.create({
      email: 'unique-email-1@gmail.com',
      fullName: 'Driver 4',
      isActive: true,
      licenseNumber: 'license-number-1',
      phoneNumber: '1234567890',
      location: new LocationPoint(30, -10),
    });
    await passengerRepository.create({ fullName: 'John Doe', email: 'john@doe.com', phoneNumber: '1234567890' });
    const aggregateDTO = new GetClosesDriversRequest();
    aggregateDTO.latitude = 0.001;
    aggregateDTO.longitude = 0.001;
    aggregateDTO.passengerId = 1;

    const result = await service.get3ClosestDriversToPassengerLocation(aggregateDTO);

    expect(result).toHaveLength(3);
    expect(result[0].fullName).toEqual('Driver 1');
    expect(result[1].fullName).toEqual('Driver 2');
    expect(result[2].fullName).toEqual('Driver 3');
  });
});
