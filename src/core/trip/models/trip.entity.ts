import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Driver } from '../../driver/models/driver.entity';
import { Passenger } from '../../passenger/models/passenger.entity';
import { Invoice } from '../../invoice/models/invoice.entity';
import { Nullable } from '../../../common/types/common.types';
import { LocationPoint } from '../../../common/models/location-point.model';
import { CreateTrip } from '../aggregates/create-trip.aggregate';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn({ name: 'trip_id'})
  public tripId: number;

  @Column({ nullable: true, name: 'passenger_id'})
  public passengerId: number;

  @Column({ nullable: true, name: 'driver_id'})
  public driverId: number;

  @Column({ nullable: true, name: 'invoice_id'})
  public invoiceId: number;

  @ManyToOne(() => Passenger, passenger => passenger.trips)
  @JoinColumn({ name: 'passenger_id' })
  public passenger: Passenger;

  @ManyToOne(() => Driver, driver => driver.trips)
  @JoinColumn({ name: 'driver_id' })
  public driver: Driver;

  @OneToOne(() => Invoice, invoice => invoice.trip)
  @JoinColumn({ name: 'invoice_id' })
  public invoice: Invoice;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true, name: 'start_location' })
  public startLocation: LocationPoint;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true, name: 'end_location' })
  public endLocation: LocationPoint;

  @CreateDateColumn({name: 'start_time'})
  public startTime: Date;

  @UpdateDateColumn({ nullable: true, name: 'end_time'})
  public endTime: Date;

  @Column({ length: 50, type: 'varchar' })
  public status: Nullable<'Completed'| 'Active' | 'Canceled'>;

  public static fromCreateTripAggregate(trip: CreateTrip): Trip {
    const {startLocation, endLocation } = trip;
    const newTrip: Trip = new Trip();
    newTrip.startLocation = new LocationPoint(startLocation.longitude, startLocation.latitude);
    newTrip.endLocation = new LocationPoint(endLocation.longitude, endLocation.latitude);
    newTrip.status = 'Active';
    newTrip.passengerId = trip.passengerId;
    newTrip.driverId = trip.driverId;

    return newTrip;
  }

  public complete(): void
  {
    this.status = 'Completed';
    this.endTime = new Date();
  }
}