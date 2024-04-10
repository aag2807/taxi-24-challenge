import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';

@Entity({ name: 'drivers' })
export class Driver {
  @PrimaryGeneratedColumn()
  public driverId: number;

  @Column({ length: 100, default: '' })
  public fullName: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  public licenseNumber: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  public email: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  public phoneNumber: string;

  @Column({ type: 'boolean', default: true})
  public isActive: boolean = true;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public location: string;

  @OneToMany(() => Trip, trip => trip.driver, { eager: true })
  public trips: Trip[];
}