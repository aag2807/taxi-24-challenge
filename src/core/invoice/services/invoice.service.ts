import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository)
  {
  }

  public async getInvoices() {
    // todo
  }

}
