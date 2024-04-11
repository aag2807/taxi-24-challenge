import { BaseRepository } from '../../../boundaries/persistance/repositories/base.repository';
import { Invoice } from '../../../core/invoice/models/invoice.entity';
import { IInvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice-repository.interface';

export class MockInvoiceRepository extends BaseRepository<Invoice> implements IInvoiceRepository {
  private inMemoryDb: Invoice[] = [];

  public create(entity: Partial<Invoice>): Promise<Invoice> {
    return new Promise((res) => {
      const invoice: Invoice = new Invoice();
      invoice.invoiceId = this.inMemoryDb.length + 1;
      invoice.amount = entity.amount;
      invoice.issueDate = entity.issueDate;
      invoice.paymentStatus = entity.paymentStatus;
      this.inMemoryDb.push(invoice);
      res(invoice);
    });
  }

  public delete(id: number): Promise<Invoice> {
    return new Promise((rej, res) => {
      const invoice = this.inMemoryDb.find(d => d.invoiceId === id);
      if (invoice) {
        this.inMemoryDb = this.inMemoryDb.filter(d => d.invoiceId !== id);
        res(invoice);
      } else {
        rej(null);
      }
    });
  }

  public exists(id: number): Promise<boolean> {
    return new Promise((res) => {
      const invoice = this.inMemoryDb.find(d => d.invoiceId === id);
      if (invoice) {
        res(true);
      } else {
        res(false);
      }
    });
  }

  public read(id: number): Promise<Invoice> {
    return new Promise((res, rej) => {
      const invoice = this.inMemoryDb.find(d => d.invoiceId === id);
      if (invoice) {
        res(invoice);
      } else {
        rej(null);
      }
    });
  }

  public readAll(): Promise<Invoice[]> {
    return Promise.resolve(this.inMemoryDb);
  }

  public update(entity: Invoice): Promise<Invoice> {
    return new Promise((res, rej) => {
      const invoice = this.inMemoryDb.find(d => d.invoiceId === entity.invoiceId);
      if (invoice) {
        invoice.amount = entity.amount;
        invoice.issueDate = entity.issueDate;
        invoice.paymentStatus = entity.paymentStatus;
        res(invoice);
      } else {
        rej(null);
      }
    });
  }
}