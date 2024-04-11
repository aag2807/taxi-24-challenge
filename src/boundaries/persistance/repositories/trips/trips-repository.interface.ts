import { IBaseRepository } from '../../base-repository.interface';
import { Trip } from '../../../../core/trip/models/trip.entity';

export interface ITripRepository extends IBaseRepository<Trip>
{
  getAllActiveTrips(): Promise<Trip[]>;
}