import { Injectable } from '@nestjs/common';
import { TripRepository } from '../../../boundaries/persistance/repositories/trips/trip.repository';
import { TripResponse } from '../aggregates/trip-response.aggregate';
import { Trip } from '../models/trip.entity';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { CreateTrip } from '../aggregates/create-trip.aggregate';
import { ArgumentGuard } from '../../../common/lib/argument/argument-guard';
import { Invoice } from '../../invoice/models/invoice.entity';
import { InvoiceResponse } from '../../invoice/models/aggregates/invoice-response.aggregate';
import { DriverService } from '../../driver/services/driver.service';
import { StateGuard } from '../../../common/lib/state/state-guard';

@Injectable()
export class TripService {

  constructor(
    private readonly tripRepository: TripRepository,
    private readonly invoiceService: InvoiceService,
    private readonly driverService: DriverService,
  ) {
  }

  public async getAllTrips(): Promise<TripResponse[]> {
    const trips: Trip[] = await this.tripRepository.readAll();
    return TripResponse.fromEntities(trips);
  }

  public async getAllActiveTrips(): Promise<TripResponse[]> {
    const activeTrips: Trip[] = await this.tripRepository.getAllActiveTrips();
    return TripResponse.fromEntities(activeTrips);
  }

  public async completeTrip(tripId: number): Promise<InvoiceResponse> {
    ArgumentGuard.greaterThan(tripId, 0, 'TripId must be greater than 0');
    const trip: Trip = await this.tripRepository.read(tripId);
    ArgumentGuard.notNull(trip, 'Trip has to exist in order to complete it');
    trip.complete();
    await this.tripRepository.update(trip);
    await this.driverService.markDriverAsActiveOrInactive(trip.driverId, true);

    return await this.invoiceService.payInvoice(trip.invoiceId);
  }

  public async createTrip(createTripAggregate: CreateTrip) {
    ArgumentGuard.greaterThan(createTripAggregate.passengerId, 0, 'PassengerId must be greater than 0');
    ArgumentGuard.greaterThan(createTripAggregate.driverId, 0, 'DriverId must be greater than 0');

    const isDriverAvailable = await this.driverService.isDriverActive(createTripAggregate.driverId);
    StateGuard.isTrue(isDriverAvailable, 'Driver is not available for a trip');
    await this.driverService.markDriverAsActiveOrInactive(createTripAggregate.driverId, false);

    const trip: Trip = await this.tripRepository.create(Trip.fromCreateTripAggregate(createTripAggregate));
    const invoice: Invoice = await this.invoiceService.createNewInvoiceForTrip(trip);
    trip.invoiceId = invoice.invoiceId;
    const updatedTrip: Trip = await this.tripRepository.update(trip);

    return TripResponse.fromEntity(updatedTrip);
  }
}
