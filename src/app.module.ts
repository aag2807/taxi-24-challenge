import { Module } from '@nestjs/common';
import { PersistenceModule } from './boundaries/persistance/persistenceModule';
import { DriverController } from './controllers/driver/driver.controller';
import { TripController } from './controllers/trip/trip.controller';
import { HealthController } from './controllers/health/health.controller';
import { PassengerController } from './controllers/passenger/passenger.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DriverService } from './core/driver/services/driver.service';
import { Driver } from './core/driver/models/driver.entity';
import { Passenger } from './core/passenger/models/passenger.entity';
import { Trip } from './core/trip/models/trip.entity';
import { Invoice } from './core/invoice/models/invoice.entity';
import { TripService } from './core/trip/services/trip.service';
import { PassengerService } from './core/passenger/services/passenger.service';
import { InvoiceService } from './core/invoice/services/invoice.service';

config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Driver, Passenger, Trip, Invoice],
      synchronize: true,
    }),
    PersistenceModule,
  ],
  controllers: [
    DriverController,
    TripController,
    HealthController,
    PassengerController,
  ],
  providers: [DriverService, TripService, PassengerService, InvoiceService],
})
export class AppModule {
}
