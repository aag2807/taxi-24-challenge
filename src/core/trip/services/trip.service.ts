import { Injectable } from '@nestjs/common';
import { TripRepository } from '../../../boundaries/persistance/repositories/trips/trip.repository';

@Injectable()
export class TripService {

  public async getAllActiveTrips() {
    // todo
  }

  public async completeTrip(tripId: number) {
    // todo
  }

  public async createTrip() {
    // todo
  }
}
