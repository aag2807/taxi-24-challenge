import { BaseRepository } from '../../../boundaries/persistance/repositories/base.repository';
import { Invoice } from '../../../core/invoice/models/invoice.entity';
import {
  IPassengerRepository,
} from '../../../boundaries/persistance/repositories/passenger/passenger-repository.interface';
import { Passenger } from '../../../core/passenger/models/passenger.entity';

export class MockPassengerRepository extends BaseRepository<Passenger> implements IPassengerRepository {
  private inMemoryDb: Passenger[] = [];

  public async create(entity: Partial<Passenger>): Promise<Passenger> {
    return new Promise((res) => {
      const passenger = new Passenger();
      passenger.fullName = entity.fullName;
      passenger.email = entity.email;
      passenger.phoneNumber = entity.phoneNumber;
      passenger.passengerId = this.inMemoryDb.length + 1;
      this.inMemoryDb.push(passenger);
      res(passenger);
    });
  }

  public async delete(id: number): Promise<Passenger> {
    return new Promise((res) => {
      const passenger = this.inMemoryDb.find((p) => p.passengerId === id);
      if (passenger) {
        this.inMemoryDb = this.inMemoryDb.filter((p) => p.passengerId !== id);
      }
      res(passenger);
    })
  }

  public async exists(id: number): Promise<boolean> {
    return new Promise((res) => {
      res(this.inMemoryDb.some((p) => p.passengerId === id));
    });
  }

  public async read(id: number): Promise<Passenger> {
    return new Promise((res) => {
      const passenger = this.inMemoryDb.find((p) => p.passengerId === id);
      if(!!passenger) {
        res(passenger);
        return;
      }
      res(null);
    });
  }

  public async readAll(): Promise<Passenger[]> {
    return Promise.resolve(this.inMemoryDb);
  }

  public async update(entity: Passenger): Promise<Passenger> {
    return new Promise((res) => {
      const passenger = this.inMemoryDb.find((p) => p.passengerId === entity.passengerId);
      if (passenger) {
        passenger.fullName = entity.fullName;
        passenger.email = entity.email;
        passenger.phoneNumber = entity.phoneNumber;
      }
      res(passenger);
    });
  }
}