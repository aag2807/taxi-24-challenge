import { BaseRepository } from '../../../boundaries/persistance/repositories/base.repository';
import { Trip } from '../../../core/trip/models/trip.entity';
import { ITripRepository } from '../../../boundaries/persistance/repositories/trips/trips-repository.interface';

export class MockTripRepository extends BaseRepository<Trip> implements ITripRepository {
  private inMemoryDb: Trip[] = [];

  public async create(entity: Partial<Trip>): Promise<Trip> {
    return new Promise((res) => {
      const trip: Trip = new Trip();
      trip.tripId = this.inMemoryDb.length + 1;
      trip.startLocation = entity.startLocation;
      trip.endLocation = entity.endLocation;
      trip.startTime = entity.startTime;
      trip.endTime = entity.endTime;
      trip.status = entity.status;
      trip.passengerId = entity.passengerId;
      trip.driverId = entity.driverId;

      this.inMemoryDb.push(trip);
      res(trip);
    });
  }

  public async delete(id: number): Promise<Trip> {
    return new Promise((rej, res) => {
      const trip = this.inMemoryDb.find(d => d.tripId === id);
      if (trip) {
        this.inMemoryDb = this.inMemoryDb.filter(d => d.tripId !== id);
        res(trip);
      } else {
        rej(null);
      }
    });
  }

  public async exists(id: number): Promise<boolean> {
    return new Promise((res) => {
      const trip = this.inMemoryDb.find(d => d.tripId === id);
      if (trip) {
        res(true);
      } else {
        res(false);
      }
    });
  }

  public async read(id: number): Promise<Trip> {
    return new Promise((res, rej) => {
      const trip = this.inMemoryDb.find(d => d.tripId === id);
      if (trip) {
        res(trip);
      } else {
        res(null);
      }
    });
  }

  public async readAll(): Promise<Trip[]> {
    return Promise.resolve(this.inMemoryDb);
  }

  public async update(entity: Trip): Promise<Trip> {
    return new Promise((res, rej) => {
      const trip = this.inMemoryDb.find(d => d.tripId === entity.tripId);
      if (trip) {
        trip.startLocation = entity.startLocation;
        trip.endLocation = entity.endLocation;
        trip.startTime = entity.startTime;
        trip.endTime = entity.endTime;
        trip.status = entity.status;
        trip.invoiceId = entity?.invoiceId || 0;

        res(trip);
      } else {
        rej(null);
      }
    });
  }

  public async getAllActiveTrips(): Promise<Trip[]> {
    return new Promise((res) => {
      res(this.inMemoryDb.filter(d => d.status === 'Active'));
    })
  }
}