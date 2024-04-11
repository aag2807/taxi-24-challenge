import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { Invoice } from '../../../../core/invoice/models/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../../core/driver/models/driver.entity';
import { Repository } from 'typeorm';
import { IInvoiceRepository } from './invoice-repository.interface';

@Injectable()
export class InvoiceRepository extends BaseRepository<Invoice> implements IInvoiceRepository {
  constructor(@InjectRepository(Driver) private readonly dbContext: Repository<Invoice>) {
    super();
  }

  public async create(entity: Partial<Invoice>): Promise<Invoice> {
    return this.dbContext.create(entity);
  }

  public async delete(id: number): Promise<Invoice> {
    const result = await this.dbContext.delete({ invoiceId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.dbContext.count({ where: { invoiceId: id } }) > 0;
  }

  public async read(id: number): Promise<Invoice> {
    return await this.dbContext.findOne({ where: { invoiceId: id } });
  }

  public async readAll(): Promise<Invoice[]> {
    return await this.dbContext.find();
  }

  public async update(entity: Invoice): Promise<Invoice> {
    return await this.dbContext.save(entity);
  }
}