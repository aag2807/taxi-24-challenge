import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice.repository';
import { Trip } from '../../trip/models/trip.entity';
import { Invoice } from '../models/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository)
  {
  }

  public async getInvoices() {
    // todo
  }

  public async createNewInvoiceForTrip(trip: Trip): Promise<Invoice> {
    const newInvoice = new Invoice();
    const amount = 100; // could be used calculating distance between start and end location multiplied by some constant
    newInvoice.amount = amount;
    newInvoice.issueDate = new Date();
    newInvoice.paymentStatus = 'Pending';
    newInvoice.tripId = trip.tripId;

    return await this.invoiceRepository.create(newInvoice);
  }

  public async getInvoiceById(id: number): Promise<Invoice> {
    return await this.invoiceRepository.read(id);
  }

  public async payInvoice(invoiceId: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.read(invoiceId);
    invoice.pay();
    return await this.invoiceRepository.update(invoice);
  }
}
