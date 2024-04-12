import { TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { TestUtils } from '../../common/testing/test.utils';
import { DriverService } from '../../core/driver/services/driver.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DriverRepository } from '../../boundaries/persistance/repositories/driver/driver.repository';
import { LocationPoint } from '../../common/models/location-point.model';

describe('DriverController', () => {
  let app: INestApplication;
  let driverRepository: DriverRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [DriverController],
      providers: [DriverService],
    });

    app = module.createNestApplication();
    driverRepository = module.get<DriverRepository>(DriverRepository);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should empty array if no drivers are saved when trying to get all drivers', () => {
    return request(app.getHttpServer())
      .get('/driver/all')
      .expect(200)
      .expect([]);
  });

  it('should get all drivers available even if none are active', async () => {
    const mockDrivers = [
      {
        driverId: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        licenseNumber: 'D12345',
        phoneNumber: '5551234567',
        isActive: true,
        location: new LocationPoint(34.0522, -118.2437), // Los Angeles
        trips: [],
      },
      {
        driverId: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        licenseNumber: 'D67890',
        phoneNumber: '5557654321',
        isActive: false,
        location: new LocationPoint(1.00, 15.00), // africa
        trips: [],
      },
    ];
    mockDrivers.forEach(async (driver) => await driverRepository.create(driver));

    return request(app.getHttpServer())
      .get('/driver/all')
      .expect(200)
      .then(response => {
        const responseBody = response.body;
        expect(responseBody).toHaveLength(2);
      });
  });

  it('should only return active drivers', async () => {
    const mockDrivers = [
      {
        driverId: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        licenseNumber: 'D12345',
        phoneNumber: '5551234567',
        isActive: true,
        location: new LocationPoint(34.0522, -118.2437), // Los Angeles
        trips: [],
      },
      {
        driverId: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        licenseNumber: 'D67890',
        phoneNumber: '5557654321',
        isActive: false,
        location: new LocationPoint(1.00, 15.00), // africa
        trips: [],
      },
    ];
    mockDrivers.forEach(async (driver) => await driverRepository.create(driver));

    return request(app.getHttpServer())
      .get('/driver/all/active')
      .expect(200)
      .then(response => {
        const responseBody = response.body;
        expect(responseBody).toHaveLength(1);
        expect(responseBody[0].driverId).toBe(1);
      });
  });

  it('should return empty array if no drivers are active', async () => {
    const mockDriver = {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      licenseNumber: 'D67890',
      phoneNumber: '5557654321',
      isActive: false,
      location: new LocationPoint(1.00, 15.00), // africa
      trips: [],
    };
    await driverRepository.create(mockDriver);

    return request(app.getHttpServer())
      .get('/driver/all/active')
      .expect(200)
      .then(response => {
        const responseBody = response.body;
        expect(responseBody).toBeDefined();
        expect(responseBody).toHaveLength(0);
      });
  });

  it('should return driver by id', async () => {
    const mockDrivers = [
      {
        driverId: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        licenseNumber: 'D12345',
        phoneNumber: '5551234567',
        isActive: true,
        location: new LocationPoint(34.0522, -118.2437), // Los Angeles
        trips: [],
      },
      {
        driverId: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        licenseNumber: 'D67890',
        phoneNumber: '5557654321',
        isActive: false,
        location: new LocationPoint(1.00, 15.00), // africa
        trips: [],
      },
    ];
    mockDrivers.forEach(async (driver) => await driverRepository.create(driver));

    return request(app.getHttpServer())
      .get('/driver/1')
      .expect(200)
      .then(response => {
        const responseBody = response.body;
        expect(responseBody).toBeDefined();
        expect(responseBody.driverId).toBe(1);
        expect(responseBody.fullName).toBe('John Doe');
      });
  });

  it('should return 404 if driver is not found', async () => {
    const mockDrivers = [
      {
        driverId: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        licenseNumber: 'D12345',
        phoneNumber: '5551234567',
        isActive: true,
        location: new LocationPoint(34.0522, -118.2437), // Los Angeles
        trips: [],
      },
      {
        driverId: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        licenseNumber: 'D67890',
        phoneNumber: '5557654321',
        isActive: false,
        location: new LocationPoint(1.00, 15.00), // africa
        trips: [],
      },
    ];
    mockDrivers.forEach(async (driver) => await driverRepository.create(driver));

    return request(app.getHttpServer())
      .get('/driver/3')
      .expect(404)
      .then(response => {
        const body = response.body;
        expect(body).toBeDefined();
        expect(body.message).toBe('driver not found');
      });
  });

  it('should fail and return 500 if id is 0', () => {
    return request(app.getHttpServer())
      .get('/driver/0')
      .expect(400)
      .then(response => {
        const body = response.body;
        expect(body).toBeDefined();
        expect(body.message).toBe('value is less than or equal to min');
      });
  });

  it('should return all drivers in a radius of 3km', async () => {
    const mockDrivers = [
      {
        driverId: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        licenseNumber: 'D12345',
        phoneNumber: '5551234567',
        isActive: true,
        location: new LocationPoint(34.0522, -118.2437), // Los Angeles
        trips: [],
      },
      {
        driverId: 2,
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        licenseNumber: 'D67890',
        phoneNumber: '5557654321',
        isActive: false,
        location: new LocationPoint(1.00, 15.00), // africa
        trips: [],
      },
    ];
    mockDrivers.forEach(async (driver) => await driverRepository.create(driver));

    return request(app.getHttpServer())
      .get('/driver/all/nearby?latitude=34.0522&longitude=-118.2437')
      .expect(200)
      .then(response => {
        const responseBody = response.body;
        expect(responseBody).toHaveLength(1);
        expect(responseBody[0].driverId).toBe(1);
        expect(responseBody[0].fullName).toBe('John Doe');
      });
  });

  it('should return 400 http status if latitude or longitude is not provided', () => {
    return request(app.getHttpServer())
      .get('/driver/all/nearby')
      .expect(400)
      .then(response => {
        const body = response.body;
        expect(body).toBeDefined();
        expect(body.message).toBe('latitude has to be provided to get drivers in radius');
      });
  });
});
