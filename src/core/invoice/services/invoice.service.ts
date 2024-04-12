import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice.repository';
import { Trip } from '../../trip/models/trip.entity';
import { Invoice } from '../models/invoice.entity';
import { InvoiceResponse } from '../models/aggregates/invoice-response.aggregate';
import { ArgumentGuard } from '../../../common/lib/argument/argument-guard';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository)
  {
  }

  public async createNewInvoiceForTrip(trip: Trip): Promise<Invoice> {
    ArgumentGuard.notNull(trip, 'Trip must exist in order to create an invoice');

    const newInvoice = new Invoice();
    const amount = 100; // could be used calculating distance between start and end location multiplied by some constant if time permits it
    newInvoice.amount = amount;
    newInvoice.issueDate = new Date();
    newInvoice.paymentStatus = 'Pending';
    newInvoice.tripId = trip.tripId;

    return await this.invoiceRepository.create(newInvoice);
  }

  public async payInvoice(invoiceId: number): Promise<InvoiceResponse> {
    ArgumentGuard.greaterThan(invoiceId, 0, 'InvoiceId must be greater than 0');

    const invoice = await this.invoiceRepository.read(invoiceId);
    invoice.pay();

    return InvoiceResponse.fromEntity(await this.invoiceRepository.update(invoice));
  }
}
