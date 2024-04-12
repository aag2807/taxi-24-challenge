import { Injectable } from '@nestjs/common';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { DriverService } from '../../driver/services/driver.service';
import { Passenger } from '../models/passenger.entity';
import { ArgumentGuard } from '../../../common/lib/argument/argument-guard';
import { GetClosesDriversRequest } from '../models/aggregates/get-closest-drivers.aggregate';
import { StateGuard } from '../../../common/lib/state/state-guard';
import { Driver } from '../../driver/models/driver.entity';

@Injectable()
export class PassengerService {
  constructor(
    private readonly passengerRepository: PassengerRepository,
    private readonly driverService: DriverService,
  ) {
  }

  public async getAllPassengers(): Promise<Passenger[]> {
    return await this.passengerRepository.readAll();
  }

  public async getPassengerById(id: number): Promise<Passenger> {
    ArgumentGuard.greaterThan(id, 0, 'id must be greater than 0');

    const passenger = await this.passengerRepository.read(id);
    ArgumentGuard.notNull(passenger, 'Passenger not found', 404);

    return passenger;
  }

  public async get3ClosestDriversToPassengerLocation(passenger: GetClosesDriversRequest): Promise<Driver[]> {
    const { longitude, latitude, passengerId } = passenger;
    ArgumentGuard.greaterThan(latitude, -90, 'latitude must be greater than -90');
    ArgumentGuard.lessThan(latitude, 90, 'latitude must be less than 90');
    ArgumentGuard.greaterThan(longitude, -180, 'longitude must be greater than -180');
    ArgumentGuard.lessThan(longitude, 180, 'longitude must be less than 180');

    const isValidPassenger = await this.passengerRepository.exists(passengerId);
    StateGuard.isTrue(isValidPassenger, 'Passenger making request doesn\'t exist');

    return await this.driverService.getClosestDriversToLocation(latitude, longitude, 3);
  }
}
