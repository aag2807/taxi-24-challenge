import { Driver } from '../../../../core/driver/models/driver.entity';
import { IBaseRepository } from '../../base-repository.interface';

export interface IDriverRepository extends IBaseRepository<Driver> {
  findNearbyDrivers(lat: number, lon: number, radiusInKm: number): Promise<Driver[]>;

  getAllActiveDrivers(): Promise<Driver[]>;

  findClosestDrivers(queryLat: number, queryLon: number, entriesToReturn: number): Promise<Driver[]>;

  isDriverActive(driverId: number): Promise<boolean>;

  markDriverStatusAs(driverId: number, status: boolean): Promise<void>;
}