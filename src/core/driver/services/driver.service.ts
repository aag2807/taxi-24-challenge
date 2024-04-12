import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../boundaries/persistance/repositories/driver/driver.repository';
import { CreateDriver } from '../aggregates/create-driver.aggregate';
import { ArgumentGuard } from '../../../common/lib/argument/argument-guard';
import { StateGuard } from '../../../common/lib/state/state-guard';
import { Driver } from '../models/driver.entity';
import { DriverResponse } from '../aggregates/driver-response.aggregate';

@Injectable()
export class DriverService {
  constructor(private readonly repo: DriverRepository) {
  }

  public async getDrivers(): Promise<DriverResponse[]> {
    const allDrivers = await this.repo.readAll();
    return DriverResponse.fromEntities(allDrivers);
  }

  public async getAllActiveDrivers(): Promise<DriverResponse[]> {
    const allActiveDrivers = await this.repo.getAllActiveDrivers();
    return DriverResponse.fromEntities(allActiveDrivers);
  }

  public async getDriversInKmRadius(lat: number, lon: number, radiusInKm: number): Promise<DriverResponse[]> {
    ArgumentGuard.greaterThan(lat, -90, 'latitude must be greater than -90');
    ArgumentGuard.lessThan(lat, 90, 'latitude must be less than 90');
    ArgumentGuard.greaterThan(lon, -180, 'longitude must be greater than -180');
    ArgumentGuard.lessThan(lon, 180, 'longitude must be less than 180');
    ArgumentGuard.greaterThan(radiusInKm, 0, 'radius must be greater than 0');

    const nearbyDrivers = await this.repo.findNearbyDrivers(lat, lon, radiusInKm)

    return DriverResponse.fromEntities(nearbyDrivers);
  }

  public async getDriverById(id: number): Promise<DriverResponse> {
    ArgumentGuard.greaterThan(id, 0);

    const driver = await this.repo.read(id);
    ArgumentGuard.notNull(driver, 'driver not found', 404);

    return DriverResponse.fromEntity(driver);
  }

  public async createDriver(createDriverAggregate: CreateDriver): Promise<Driver> {
    ArgumentGuard.notNull(createDriverAggregate, 'data cannot be null to create a driver');
    StateGuard.isTrue(!!createDriverAggregate.fullName, 'fullName cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.email, 'email cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.phoneNumber, 'phoneNumber cannot be null or empty');
    StateGuard.isTrue(!!createDriverAggregate.licenseNumber, 'licenseNumber cannot be null or empty');

    return await this.repo.create(createDriverAggregate.toEntity());
  }

  public async getClosestDriversToLocation(latitude: number, longitude: number, amountOfDriversToSearch: number): Promise<Driver[]> {
    ArgumentGuard.greaterThan(latitude, -90, 'latitude must be greater than -90');
    ArgumentGuard.lessThan(latitude, 90, 'latitude must be less than 90');
    ArgumentGuard.greaterThan(longitude, -180, 'longitude must be greater than -180');
    ArgumentGuard.lessThan(longitude, 180, 'longitude must be less than 180');
    ArgumentGuard.greaterThan(amountOfDriversToSearch, 0, 'the amount of drivers to search for must be at least 1');

    return await this.repo.findClosestDrivers(latitude, longitude, amountOfDriversToSearch);
  }

  public async isDriverActive(driverId: number): Promise<boolean> {
    ArgumentGuard.greaterThan(driverId, 0, 'driverId must be greater than 0');

    return await this.repo.isDriverActive(driverId);
  }
}
