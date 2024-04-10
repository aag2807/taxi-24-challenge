import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  public invoiceId: number;

  @OneToOne(() => Trip)
  @JoinColumn({ name: 'tripId' })
  public trip: Trip;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public amount: number;

  @CreateDateColumn()
  public issueDate: Date;

  @Column({ type: 'varchar', length: 100, default: '' })
  public paymentStatus: string;
}