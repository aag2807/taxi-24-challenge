import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { Invoice } from '../../../../core/invoice/models/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceRepository extends BaseRepository<Invoice> {
  constructor(@InjectRepository(Driver) private invoiceRepository: Repository<Invoice>) {
    super();
  }

  public async create(entity: Partial<Invoice>): Promise<Invoice> {
    return Promise.resolve(undefined);
  }

  public async delete(id: number): Promise<Invoice> {
    return Promise.resolve(undefined);
  }

  public async exists(id: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async read(id: number): Promise<Invoice> {
    return Promise.resolve(undefined);
  }

  public async readAll(): Promise<Invoice[]> {
    return Promise.resolve([]);
  }

  public async update(entity: Invoice): Promise<Invoice> {
    return Promise.resolve(undefined);
  }
}