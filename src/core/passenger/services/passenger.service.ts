import { Injectable } from '@nestjs/common';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { DriverService } from '../../driver/services/driver.service';
import { Passenger } from '../models/passenger.entity';
import { ArgumentGuard } from '../../../common/lib/argument/argument-guard';

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

  public async getPassengerById(id: number) {
    ArgumentGuard.greaterThan(id, 0, 'id must be greater than 0');

    const passenger = await this.passengerRepository.read(id);
    ArgumentGuard.notNull(passenger, 'Passenger not found', 404);

    return passenger;
  }

  public async getClosestDriversToPartingPoint() {
    //
  }
}
