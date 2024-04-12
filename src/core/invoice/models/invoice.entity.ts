import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';
import { Nullable } from '../../../common/types/common.types';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  public invoiceId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public amount: number;

  @CreateDateColumn()
  public issueDate: Date;

  @CreateDateColumn()
  public paidDate: Nullable<Date>;

  @Column({ length: 25, type: 'varchar', default: 'Pending'})
  public paymentStatus: Nullable<'Paid'| 'Pending'| 'Canceled' >;

  @Column({ nullable: true })
  public tripId: number;

  @OneToOne(() => Trip)
  @JoinColumn({ name: 'tripId' })
  public trip: Trip;

  public pay() {
    this.paymentStatus = 'Paid';
    this.paidDate = new Date();
  }
}