import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../boundaries/persistance/repositories/driver/driver.repository';
import { CreateDriver } from '../aggregates/createDriver.aggregate';
import { ArgumentGuard } from '../../../common/lib/argument/argument-guard';
import { StateGuard } from '../../../common/lib/state/state-guard';
import { Driver } from '../models/driver.entity';
import { Passenger } from '../../passenger/models/passenger.entity';

@Injectable()
export class DriverService {
  constructor(private readonly repo: DriverRepository) {}

  public async getDrivers(): Promise<Driver[]> {
    return await this.repo.readAll();
  }

  public async getAllActiveDrivers(): Promise<Driver[]> {
    return this.repo.getAllActiveDrivers();
  }

  public async getDriversInKmRadius(lat: number, lon: number, radiusInKm: number): Promise<Driver[]> {
    ArgumentGuard.greaterThan(lat, -90, 'latitude must be greater than -90');
    ArgumentGuard.lessThan(lat, 90, 'latitude must be less than 90');
    ArgumentGuard.greaterThan(lon, -180, 'longitude must be greater than -180');
    ArgumentGuard.lessThan(lon, 180, 'longitude must be less than 180');
    ArgumentGuard.greaterThan(radiusInKm, 0, 'radius must be greater than 0');

    return await this.repo.findNearbyDrivers(lat, lon, radiusInKm);
  }

  public async getDriverById(id: number): Promise<Driver> {
    ArgumentGuard.notNull(id, 'id cannot be null to get a driver');
    ArgumentGuard.greaterThan(id, 0);

    const driver = await this.repo.read(id);
    ArgumentGuard.notNull(driver, 'driver not found', 404);

    return driver;
  }

  public async createDriver(createDriverAggregate: CreateDriver): Promise<Driver> {
    ArgumentGuard.notNull(createDriverAggregate, 'data cannot be null to create a driver');
    StateGuard.isTrue(!!createDriverAggregate.fullName, 'fullName cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.email, 'email cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.phoneNumber, 'phoneNumber cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.licenseNumber, 'licenseNumber cannot be null or empty');

    return await this.repo.create(createDriverAggregate.toEntity());
  }

  public async getClosesDriversToPassengerLocation(passenger: Passenger) {
    // todo
  }
}
