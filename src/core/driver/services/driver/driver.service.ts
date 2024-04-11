import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../../boundaries/persistance/repositories/driver/driver.repository';
import { CreateDriver } from '../../aggregates/createDriver.aggregate';
import { ArgumentGuard } from '../../../../common/lib/argument/argument-guard';
import { StateGuard } from '../../../../common/lib/state/state-guard';

@Injectable()
export class DriverService {
  constructor(private readonly repo: DriverRepository) {
  }

  public async getDrivers() {
    return this.repo.readAll();
  }

  public async getAllActiveDrivers() {
    return this.repo.getAllActiveDrivers();
  }

  public async getDriverById(id: number) {
    ArgumentGuard.notNull(id, 'id cannot be null to get a driver');
    ArgumentGuard.greaterThan(id, 0);

    return await this.repo.read(id);
  }

  public async createDriver(createDriverAggregate: CreateDriver) {
    ArgumentGuard.notNull(createDriverAggregate, 'data cannot be null to create a driver');
    StateGuard.isTrue(!!createDriverAggregate.fullName, 'fullName cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.email, 'email cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.phoneNumber, 'phoneNumber cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.licenseNumber, 'licenseNumber cannot be null or empty');

    return await this.repo.create(createDriverAggregate.toEntity());
  }
}
