import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  public driverId: number;

  @Column({ length: 100 })
  public fullName: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  public licenseNumber: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  public phoneNumber: string;

  @Column()
  public isActive: boolean = true;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  public location: string;

  @OneToMany(() => Trip, trip => trip.driver)
  public trips: Trip[];
}