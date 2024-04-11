import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { Repository } from 'typeorm';
import { Passenger } from '../../../../core/passenger/models/passenger.entity';
import { IPassengerRepository } from './passenger-repository.interface';

@Injectable()
export class PassengerRepository extends BaseRepository<Passenger> implements IPassengerRepository {
  constructor(@InjectRepository(Driver) private readonly dbContext: Repository<Passenger>) {
    super();
  }

  public async create(entity: Partial<Passenger>): Promise<Passenger> {
    return this.dbContext.create(entity);
  }

  public async delete(id: number): Promise<Passenger> {
    const result = await this.dbContext.delete({ passengerId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.dbContext.count({ where: { passengerId: id } }) > 0;
  }

  public async read(id: number): Promise<Passenger> {
    return await this.dbContext.findOne({ where: { passengerId: id } });
  }

  public async readAll(): Promise<Passenger[]> {
    return await this.dbContext.find();
  }

  public async update(entity: Passenger): Promise<Passenger> {
    return await this.dbContext.save(entity);
  }
}