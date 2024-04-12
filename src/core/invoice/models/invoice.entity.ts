import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../../trip/models/trip.entity';
import { Nullable } from '../../../common/types/common.types';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn({ name: 'invoice_id'})
  public invoiceId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public amount: number;

  @CreateDateColumn({name: 'issue_date'})
  public issueDate: Date;

  @CreateDateColumn({name: 'due_date'})
  public paidDate: Nullable<Date>;

  @Column({ length: 25, type: 'varchar', default: 'Pending', name: 'payment_status'})
  public paymentStatus: Nullable<'Paid'| 'Pending'| 'Canceled' >;

  @Column({ nullable: true, name: 'trip_id'})
  public tripId: number;

  @OneToOne(() => Trip)
  @JoinColumn({ name: 'trip_id' })
  public trip: Trip;

  public pay() {
    this.paymentStatus = 'Paid';
    this.paidDate = new Date();
  }
}