import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../../../../core/trip/models/trip.entity';
import { ITripRepository } from './trips-repository.interface';
import { Nullable } from '../../../../common/types/common.types';

@Injectable()
export class TripRepository extends BaseRepository<Trip> implements ITripRepository {
  constructor(@InjectRepository(Trip) private readonly dbContext: Repository<Trip>) {
    super();
  }

  public async create(entity: Partial<Trip>): Promise<Trip> {
    return this.dbContext.save(entity);
  }

  public async delete(id: number): Promise<Trip> {
    const result = await this.dbContext.delete({ tripId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.dbContext.count({ where: { tripId: id } }) > 0;
  }

  public async read(id: number): Promise<Nullable<Trip>> {
    try {
      return await this.dbContext.findOne({ where: { tripId: id }, relations: ['driver', 'passenger', 'invoice'] });
    } catch (e) {
      return null;
    }
  }

  public async readAll(): Promise<Trip[]> {
    return await this.dbContext.find({
      relations: ['driver', 'passenger', 'invoice'],
      order: { tripId: 'ASC'}
    });
  }

  public async update(entity: Trip): Promise<Trip> {
    await this.dbContext.save(entity);
    return await this.read(entity.tripId);
  }

  public async getAllActiveTrips(): Promise<Trip[]> {
    return await this.dbContext
      .find({
        where: { status: 'Active' },
        relations:['driver', 'passenger', 'invoice'],
        order: { tripId: 'ASC'}
      });
  }
}