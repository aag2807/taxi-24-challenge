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
  @PrimaryGeneratedColumn()
  public tripId: number;

  @Column({ nullable: true })
  public passengerId: number;

  @Column({ nullable: true })
  public driverId: number;

  @Column({ nullable: true })
  public invoiceId: number;

  @ManyToOne(() => Passenger, passenger => passenger.trips)
  @JoinColumn({ name: 'passengerId' })
  public passenger: Passenger;

  @ManyToOne(() => Driver, driver => driver.trips)
  @JoinColumn({ name: 'driverId' })
  public driver: Driver;

  @OneToOne(() => Invoice, invoice => invoice.trip)
  @JoinColumn({ name: 'invoiceId' })
  public invoice: Invoice;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public startLocation: LocationPoint;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public endLocation: LocationPoint;

  @CreateDateColumn()
  public startTime: Date;

  @UpdateDateColumn({ nullable: true })
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