import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../core/driver/models/driver.entity';
import { Passenger } from '../../core/passenger/models/passenger.entity';
import { Trip } from '../../core/trip/models/trip.entity';
import { Invoice } from '../../core/invoice/models/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, Passenger, Trip, Invoice]),
  ],
})
export class PersistenceModule {}
