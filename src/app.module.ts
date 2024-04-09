import { Module } from '@nestjs/common';
import { PersistenceModule } from './boundaries/persistance/persistenceModule';
import { DriverController } from './controllers/driver/driver.controller';
import { TripController } from './controllers/trip/trip.controller';
import { HealthController } from './controllers/health/health.controller';
import { PassengerController } from './controllers/passenger/passenger.controller';
import { HealthCheckService } from './core/health/services/health-check/health-check.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PersistenceModule],
  controllers: [DriverController, TripController, HealthController, PassengerController],
  providers: [HealthCheckService],
})
export class AppModule {
}
