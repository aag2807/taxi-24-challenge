import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { Repository } from 'typeorm';
import { Trip } from '../../../../core/trip/models/trip.entity';
import { ITripRepository } from './trips-repository.interface';

@Injectable()
export class TripRepository extends BaseRepository<Trip> implements ITripRepository {
  constructor(@InjectRepository(Driver) private readonly dbContext: Repository<Trip>) {
    super();
  }

  public async create(entity: Partial<Trip>): Promise<Trip> {
    return this.dbContext.create(entity);
  }

  public async delete(id: number): Promise<Trip> {
    const result = await this.dbContext.delete({ tripId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.dbContext.count({ where: { tripId: id } }) > 0;
  }

  public async read(id: number): Promise<Trip> {
    return await this.dbContext.findOne({ where: { tripId: id } });
  }

  public async readAll(): Promise<Trip[]> {
    return await this.dbContext.find();
  }

  public async update(entity: Trip): Promise<Trip> {
    return await this.dbContext.save(entity);
  }

  public async getAllActiveTrips(): Promise<Trip[]> {
    return await this.dbContext
      .find({ where: { status: 'Active' } });
  }
}