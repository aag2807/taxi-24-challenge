import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../core/driver/models/driver.entity';
import { Passenger } from '../../core/passenger/models/passenger.entity';
import { Trip } from '../../core/trip/models/trip.entity';
import { Invoice } from '../../core/invoice/models/invoice.entity';
import { DriverRepository } from './repositories/driver/driver.repository';
import { InvoiceRepository } from './repositories/invoice/invoice.repository';
import { PassengerRepository } from './repositories/passenger/passenger.repository';
import { TripRepository } from './repositories/trips/trip.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, Passenger, Trip, Invoice]),
  ],
  providers: [
    DriverRepository,
    InvoiceRepository,
    PassengerRepository,
    TripRepository,
  ],
  exports: [
    DriverRepository,
    InvoiceRepository,
    PassengerRepository,
    TripRepository,
  ],
})
export class PersistenceModule {
}
