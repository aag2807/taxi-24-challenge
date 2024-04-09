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

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  public tripId: number;

  @ManyToOne(() => Passenger, passenger => passenger.trips)
  @JoinColumn({ name: 'passengerId' })
  public passenger: Passenger;

  @ManyToOne(() => Driver, driver => driver.trips)
  @JoinColumn({ name: 'driverId' })
  public driver: Driver;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public startLocation: string;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public endLocation: string;

  @CreateDateColumn()
  public startTime: Date;

  @UpdateDateColumn({ nullable: true }) // endTime can be null for ongoing trips
  public endTime: Date;

  @Column({ length: 50 })
  public status: string;

  @OneToOne(() => Invoice, invoice => invoice.trip)
  public invoice: Invoice;
}