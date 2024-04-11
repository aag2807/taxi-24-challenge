import { Injectable } from '@nestjs/common';
import { TripRepository } from '../../../boundaries/persistance/repositories/trips/trip.repository';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  public async getAllActiveTrips() {
    return this.tripRepository.getAllActiveTrips();
  }

  public async completeTrip(tripId: number) {
    // todo
  }

  public async createTrip() {
    // todo
  }
}
