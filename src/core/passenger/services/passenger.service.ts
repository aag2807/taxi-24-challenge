import { Injectable } from '@nestjs/common';
import { PassengerRepository } from '../../../boundaries/persistance/repositories/passenger/passenger.repository';
import { DriverService } from '../../driver/services/driver.service';

@Injectable()
export class PassengerService {
  constructor(
    private readonly passengerRepository: PassengerRepository,
    private readonly driverService: DriverService,
  ) {
  }

  public async getPassengers() {
    // todo
  }

  public async getPassengerById(id: number) {
    // todo
  }

  public async getClosestDriversToPartingPoint() {
    //
  }
}
