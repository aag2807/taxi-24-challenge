import { BaseRepository } from '../base.repository';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IDriverRepository } from './driver-repository.interface';
import { Nullable } from '../../../../common/types/common.types';

@Injectable()
export class DriverRepository extends BaseRepository<Driver> implements IDriverRepository {
  constructor(@InjectRepository(Driver) private readonly dbContext: Repository<Driver>) {
    super();
  }

  public async create(entity: Partial<Driver>): Promise<Driver> {
    return this.dbContext.save(entity);
  }

  public async delete(id: number): Promise<Driver> {
    const result = await this.dbContext.delete({ driverId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.dbContext.count({ where: { driverId: id } }) > 0;
  }

  public async read(id: number): Promise<Nullable<Driver>> {
    try {
      return await this.dbContext.findOne({ where: { driverId: id } });
    } catch (e) {
      return null;
    }
  }

  public async readAll(): Promise<Driver[]> {
    return await this.dbContext.find();
  }

  public async getAllActiveDrivers(): Promise<Driver[]> {
    return await this.dbContext.find({ where: { isActive: true } });
  }

  public async update(entity: Driver): Promise<Driver> {
    return await this.dbContext.save(entity);
  }

  public async findNearbyDrivers(lat: number, lon: number, radiusInKm: number): Promise<Driver[]> {
    const kmInMeters = radiusInKm * 1000;

    return this.dbContext.createQueryBuilder('driver')
      .where(`ST_DWithin(
        driver.location,
        geography(ST_MakePoint(:lon, :lat)),
        :kmInMeters
      ) AND driver.isActive = true`)
      .setParameters({ lon, lat, kmInMeters })
      .getMany();
  }

  public async findClosestDrivers(lat: number, lon: number, entriesToReturn: number): Promise<Driver[]> {
    const threeKmRadiusToSearchFor = 3 * 1000;

    return this.dbContext.createQueryBuilder('driver')
      .addSelect(`ST_Distance(
        driver.location,
        geography(ST_MakePoint(:lon, :lat))
      )`, 'distance')
      .where(`ST_DWithin(
        driver.location,
        geography(ST_MakePoint(:lon, :lat)),
        :threeKmRadiusToSearchFor
      ) AND driver.isActive = true`)
      .orderBy('distance', 'ASC')
      .setParameters({ lon, lat, threeKmRadiusToSearchFor })
      .limit(entriesToReturn)
      .getMany();
  }

  public async isDriverActive(driverId: number): Promise<boolean> {
    return await this.dbContext.count({ where: { driverId, isActive: true } }) > 0;
  }
}

