import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';
import { LocationPoint } from '../../../common/models/location-point.model';
import { Nullable } from '../../../common/types/common.types';

@Entity({ name: 'drivers' })
export class Driver {
  @PrimaryGeneratedColumn({name:'driver_id'})
  public driverId: number;

  @Column({ length: 100, default: '', name: 'full_name' })
  public fullName: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true, name: 'license_number'})
  public licenseNumber: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  public email: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true, name: 'phone_number'})
  public phoneNumber: string;

  @Column({ type: 'boolean', default: true, name: 'is_active'})
  public isActive: boolean = true;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public location: LocationPoint;

  @OneToMany(() => Trip, trip => trip.driver)
  public trips: Trip[];
}