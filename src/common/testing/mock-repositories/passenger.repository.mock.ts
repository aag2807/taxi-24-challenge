import { BaseRepository } from '../../../boundaries/persistance/repositories/base.repository';
import { Invoice } from '../../../core/invoice/models/invoice.entity';
import {
  IPassengerRepository,
} from '../../../boundaries/persistance/repositories/passenger/passenger-repository.interface';
import { Passenger } from '../../../core/passenger/models/passenger.entity';

export class MockPassengerRepository extends BaseRepository<Passenger> implements IPassengerRepository {
  private inMemoryDb: Passenger[] = [];

  public async create(entity: Partial<Passenger>): Promise<Passenger> {
    return Promise.resolve(undefined);
  }

  public async delete(id: number): Promise<Passenger> {
    return Promise.resolve(undefined);
  }

  public async exists(id: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async read(id: number): Promise<Passenger> {
    return Promise.resolve(undefined);
  }

  public async readAll(): Promise<Passenger[]> {
    return Promise.resolve([]);
  }

  public async update(entity: Passenger): Promise<Passenger> {
    return Promise.resolve(undefined);
  }
}