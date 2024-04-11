import { BaseRepository } from '../base.repository';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverRepository extends BaseRepository<Driver> {
  constructor(@InjectRepository(Driver) private driverRepository: Repository<Driver>) {
    super();
  }

  public async create(entity: Partial<Driver>): Promise<Driver> {
    return this.driverRepository.create(entity);
  }

  public async delete(id: number): Promise<Driver> {
    const result = await this.driverRepository.delete({ driverId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.driverRepository.count({ where: { driverId: id } }) > 0;
  }

  public async read(id: number): Promise<Driver> {
    return await this.driverRepository.findOne({ where: { driverId: id } });
  }

  public async readAll(): Promise<Driver[]> {
    return await this.driverRepository.find();
  }

  public async getAllActiveDrivers(): Promise<Driver[]> {
    return await this.driverRepository.find({ where: { isActive: true } });
  }

  public async update(entity: Driver): Promise<Driver> {
    return await this.driverRepository.save(entity);
  }
}