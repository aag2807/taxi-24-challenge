import { TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TestUtils } from '../../common/testing/test.utils';
import { INestApplication } from '@nestjs/common';
import { TripRepository } from '../../boundaries/persistance/repositories/trips/trip.repository';
import { TripService } from '../../core/trip/services/trip.service';
import { LocationPoint } from '../../common/models/location-point.model';
import { Driver } from '../../core/driver/models/driver.entity';
import { Passenger } from '../../core/passenger/models/passenger.entity';
import { PassengerRepository } from '../../boundaries/persistance/repositories/passenger/passenger.repository';
import { DriverRepository } from '../../boundaries/persistance/repositories/driver/driver.repository';
import { Trip } from '../../core/trip/models/trip.entity';
import * as request from 'supertest';
import { InvoiceService } from '../../core/invoice/services/invoice.service';
import { InvoiceRepository } from '../../boundaries/persistance/repositories/invoice/invoice.repository';
import { CreateTrip } from '../../core/trip/aggregates/create-trip.aggregate';
import { Coordinate } from '../../common/models/coordinates.model';

describe('TripController', () => {
  let app: INestApplication;
  let tripRepository: TripRepository;
  let passengerRepository: PassengerRepository;
  let driverRepository: DriverRepository;
  let invoiceRepository: InvoiceRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [TripController],
      providers: [TripService, InvoiceService],
    });

    app = module.createNestApplication();
    tripRepository = module.get<TripRepository>(TripRepository);
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
    driverRepository = module.get<DriverRepository>(DriverRepository);
    invoiceRepository = module.get<InvoiceRepository>(InvoiceRepository);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return an array for all trips', async () => {
    await createTripWithPassengerAndDriver();
    await createTripWithPassengerAndDriver();

    return request(app.getHttpServer())
      .get('/trip/all')
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).toHaveLength(2);
        expect(body[0].tripId).toBe(1)
        expect(body[1].tripId).toBe(2)
      });
  });

  it('should return an array for all active trips', async () => {
    await createTripWithPassengerAndDriver('Canceled');
    await createTripWithPassengerAndDriver('Active');

    return request(app.getHttpServer())
      .get('/trip/all/active')
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).toHaveLength(1);
        expect(body[0].tripId).toBe(2)
      });
  });

  it('should create a trip and it should return status code 202, invoice should be created', async() => {
    const driver: Driver = await driverRepository.create({
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      licenseNumber: 'D67890',
      phoneNumber: '5557654321',
      isActive: false,
      location: new LocationPoint(1.00, 15.00), // africa
      trips: [],
    });
    const passenger_1: Passenger = await passengerRepository.create({
      fullName: 'passenger 1',
      email: 'passenger1@email.com',
      phoneNumber: '1234567890',
    });
    const createTripAggregate = new CreateTrip();
    createTripAggregate.driverId = driver.driverId;
    createTripAggregate.passengerId = passenger_1.passengerId;
    createTripAggregate.startLocation = new Coordinate(1.00, 15.00);
    createTripAggregate.endLocation = new Coordinate(1.00, 15.00);
    createTripAggregate.startTime = new Date();

    return request(app.getHttpServer())
      .post('/trip/create')
      .send(createTripAggregate)
      .expect(202)
      .then(async (response) => {
        const body = response.body;
        expect(body.tripId).toBe(1);
        const invoice = await invoiceRepository.exists(body.invoiceId);
        expect(invoice).toBeTruthy();
      });
  })

  const createTripWithPassengerAndDriver = async (status: 'Active' | 'Canceled'| 'Completed' = 'Active') => {
    const driver: Driver = await driverRepository.create({
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      licenseNumber: 'D67890',
      phoneNumber: '5557654321',
      isActive: false,
      location: new LocationPoint(1.00, 15.00), // africa
      trips: [],
    });
    const passenger_1: Passenger = await passengerRepository.create({
      fullName: 'passenger 1',
      email: 'passenger1@email.com',
      phoneNumber: '1234567890',
    });
    const trip: Partial<Trip> = {
      status: status,
      endLocation: new LocationPoint(1.00, 15.00),
      startLocation: new LocationPoint(1.00, 15.00),
      endTime: new Date(),
      startTime: new Date(),
      driverId: driver.driverId,
      passengerId: passenger_1.passengerId,
    }

    await tripRepository.create(trip as Trip);
  };
});
