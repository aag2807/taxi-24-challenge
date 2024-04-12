import { TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { TestUtils } from '../../../common/testing/test.utils';
import { InvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice.repository';
import { TripRepository } from '../../../boundaries/persistance/repositories/trips/trip.repository';
import { DriverRepository } from '../../../boundaries/persistance/repositories/driver/driver.repository';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { Driver } from '../../driver/models/driver.entity';
import { LocationPoint } from '../../../common/models/location-point.model';
import { Passenger } from '../../passenger/models/passenger.entity';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let invoiceRepository: InvoiceRepository;
  let tripRepository: TripRepository;
  let driverRepository: DriverRepository;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      providers: [InvoiceService],
    });

    service = module.get<InvoiceService>(InvoiceService);
    invoiceRepository = module.get<InvoiceRepository>(InvoiceRepository);
    tripRepository = module.get<TripRepository>(TripRepository);
    driverRepository = module.get<DriverRepository>(DriverRepository);
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
  });

  it('should create a new invoice for a trip', async () => {
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
    const trip = await tripRepository.create({
      driverId: driver.driverId,
      passengerId: passenger_1.passengerId,
      startLocation: new LocationPoint(1.00, 15.00),
      endLocation: new LocationPoint(1.00, 15.00),
      status: 'Active',
      invoiceId: 0,
    });

    const invoice = await service.createNewInvoiceForTrip(trip);

    expect(invoice).toBeDefined();
    expect(invoice.amount).toEqual(100);
  });

  it('should fail when creating a new invoice if passed trip is null', async () => {
    await expect(service.createNewInvoiceForTrip(null)).rejects.toThrow('Trip must exist in order to create an invoice');
  });

  it('should pay an invoice', async () => {
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
    const trip = await tripRepository.create({
      driverId: driver.driverId,
      passengerId: passenger_1.passengerId,
      startLocation: new LocationPoint(1.00, 15.00),
      endLocation: new LocationPoint(1.00, 15.00),
      status: 'Active',
      invoiceId: 0,
    });
    const invoice = await service.createNewInvoiceForTrip(trip);

    const invoiceResponse = await service.payInvoice(invoice.invoiceId);

    expect(invoiceResponse).toBeDefined();
    expect(invoiceResponse.invoiceId).toEqual(1);
  });

  it('should fail when paying an invoice if passed invoiceId is less than 0', async () => {
    await expect(service.payInvoice(-1)).rejects.toThrow('InvoiceId must be greater than 0');
  });
});
