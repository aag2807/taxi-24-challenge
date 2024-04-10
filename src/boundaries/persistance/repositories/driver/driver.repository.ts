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

  public async delete(id: string): Promise<Driver> {
    return Promise.resolve(undefined);
  }

  public async exists(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async read(id: string): Promise<Driver> {
    return Promise.resolve(undefined);
  }

  public async readAll(): Promise<Driver[]> {
    return await this.driverRepository.find();
  }

  public async update(entity: Driver): Promise<Driver> {
    return Promise.resolve(undefined);
  }
}