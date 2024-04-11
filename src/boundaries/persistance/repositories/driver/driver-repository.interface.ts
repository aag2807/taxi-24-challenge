import { Driver } from '../../../../core/driver/models/driver.entity';
import { IBaseRepository } from '../../base-repository.interface';

export interface IDriverRepository extends IBaseRepository<Driver>
{
  findNearbyDrivers(lat: number, lon: number, radiusInKm: number): Promise<Driver[]>;

  getAllActiveDrivers(): Promise<Driver[]>;
}