import { Module } from '@nestjs/common';
import { PersistenceModule } from './boundaries/persistance/persistenceModule';
import { DriverController } from './controllers/driver/driver.controller';
import { TripController } from './controllers/trip/trip.controller';
import { HealthController } from './controllers/health/health.controller';
import { PassengerController } from './controllers/passenger/passenger.controller';
import { HealthCheckService } from './core/health/services/health-check/health-check.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

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
    }),
    PersistenceModule
  ],
  controllers: [
    DriverController,
    TripController,
    HealthController,
    PassengerController
  ],
  providers: [HealthCheckService],
})
export class AppModule {
}
