import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { Repository } from 'typeorm';
import { Trip } from '../../../../core/trip/models/trip.entity';

@Injectable()
export class TripRepository extends BaseRepository<Trip> {
  constructor(@InjectRepository(Driver) private tripRepository: Repository<Trip>) {
    super();
  }

  public async create(entity: Partial<Trip>): Promise<Trip> {
    return Promise.resolve(undefined);
  }

  public async delete(id: string): Promise<Trip> {
    return Promise.resolve(undefined);
  }

  public async exists(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async read(id: string): Promise<Trip> {
    return Promise.resolve(undefined);
  }

  public async readAll(): Promise<Trip[]> {
    return Promise.resolve([]);
  }

  public async update(entity: Trip): Promise<Trip> {
    return Promise.resolve(undefined);
  }
}