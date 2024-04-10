import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { Repository } from 'typeorm';
import { Passenger } from '../../../../core/passenger/models/passenger.entity';

@Injectable()
export class PassengerRepository extends BaseRepository<Passenger> {
  constructor(@InjectRepository(Driver) private passengerRepository: Repository<Passenger>) {
    super();
  }

  public async create(entity: Partial<Passenger>): Promise<Passenger> {
    return Promise.resolve(undefined);
  }

  public async delete(id: string): Promise<Passenger> {
    return Promise.resolve(undefined);
  }

  public async exists(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async read(id: string): Promise<Passenger> {
    return Promise.resolve(undefined);
  }

  public async readAll(): Promise<Passenger[]> {
    return Promise.resolve([]);
  }

  public async update(entity: Passenger): Promise<Passenger> {
    return Promise.resolve(undefined);
  }
}