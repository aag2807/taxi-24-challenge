import { TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { TestUtils } from '../../../common/testing/test.utils';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { TripRepository } from '../../../boundaries/persistance/repositories/trips/trip.repository';
import { InvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice.repository';
import { Driver } from '../../driver/models/driver.entity';
import { LocationPoint } from '../../../common/models/location-point.model';
import { Passenger } from '../../passenger/models/passenger.entity';
import { Trip } from '../models/trip.entity';
import { DriverRepository } from '../../../boundaries/persistance/repositories/driver/driver.repository';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { CreateTrip } from '../aggregates/create-trip.aggregate';
import { Coordinate } from '../../../common/models/coordinates.model';
import { TripResponse } from '../aggregates/trip-response.aggregate';

describe('TripService', () => {
  let service: TripService;
  let tripRepository: TripRepository;
  let invoiceRepository: InvoiceRepository;
  let driverRepository: DriverRepository;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      providers: [TripService, InvoiceService],
    });

    service = module.get<TripService>(TripService);
    tripRepository = module.get<TripRepository>(TripRepository);
    invoiceRepository = module.get<InvoiceRepository>(InvoiceRepository);
    driverRepository = module.get<DriverRepository>(DriverRepository);
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
  });

  it('should return an empty array if there are no trips', async () => {
    const trips = await service.getAllTrips();

    expect(trips).toEqual([]);
  });

  it('should return an empty array if there are no active trips', async () => {
    const trips = await service.getAllActiveTrips();

    expect(trips).toEqual([]);
  });

  it('should return all trips regardless of status', async () => {
    await createTripWithPassengerAndDriver('Active');
    await createTripWithPassengerAndDriver('Canceled');
    await createTripWithPassengerAndDriver('Completed');

    const trips = await service.getAllTrips();

    expect(trips.length).toEqual(3);
  });

  it('should return all active trips', async () => {
    await createTripWithPassengerAndDriver('Active');
    await createTripWithPassengerAndDriver('Canceled');
    await createTripWithPassengerAndDriver('Completed');

    const trips = await service.getAllActiveTrips();

    expect(trips.length).toEqual(1);
  });

  it('should create a new  trip', async () => {
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

    const trip: TripResponse = await service.createTrip(createTripAggregate);
    const invoice = await invoiceRepository.read(1);

    expect(trip).toBeDefined();
    expect(invoice).toBeDefined();
    expect(invoice.paymentStatus).toEqual('Pending')
  });

  it('should complete a trip', async () => {
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
    const trip: TripResponse = await service.createTrip(createTripAggregate);

    await service.completeTrip(trip.tripId);
    const completedTrip = await tripRepository.read(trip.tripId);
    const paidInvoice = await invoiceRepository.read(1);

    expect(completedTrip.status).toEqual('Completed');
    expect(paidInvoice.paymentStatus).toEqual('Paid')
  });

  const createTripWithPassengerAndDriver = async (status: 'Active' | 'Canceled'| 'Completed' = 'Active'): Promise<void> => {
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
