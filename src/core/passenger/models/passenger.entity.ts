import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';

@Entity('passengers')
export class Passenger {
  @PrimaryGeneratedColumn({name:'passenger_id'})
  public passengerId: number;

  @Column({ length: 100, default: '', name: 'full_name'})
  public fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true, name: 'phone_number'})
  public phoneNumber: string;

  @OneToMany(() => Trip, trip => trip.passenger)
  public trips: Trip[];
}