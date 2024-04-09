import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';

@Entity('passengers')
export class Passenger {
  @PrimaryGeneratedColumn()
  public passengerId: number;

  @Column({ length: 100 })
  public fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  public phoneNumber: string;

  @OneToMany(() => Trip, trip => trip.passenger)
  public trips: Trip[];
}