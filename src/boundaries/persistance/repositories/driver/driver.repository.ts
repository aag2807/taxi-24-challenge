import { BaseRepository } from '../base.repository';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverRepository extends BaseRepository<Driver>
{
  constructor( @InjectRepository(Driver) private userRepository: Repository<Driver>) {
    super();
  }

  public async create(entity: Partial<Driver>): Promise<Driver> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<Driver> {
    return Promise.resolve(undefined);
  }

  exists(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  read(id: string): Promise<Driver> {
    return Promise.resolve(undefined);
  }

  readAll(): Promise<Driver[]> {
    return Promise.resolve([]);
  }

  update(entity: Driver): Promise<Driver> {
    return Promise.resolve(undefined);
  }

}