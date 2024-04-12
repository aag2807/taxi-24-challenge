import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { Invoice } from '../../../../core/invoice/models/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInvoiceRepository } from './invoice-repository.interface';
import { Nullable } from '../../../../common/types/common.types';

@Injectable()
export class InvoiceRepository extends BaseRepository<Invoice> implements IInvoiceRepository {
  constructor(@InjectRepository(Invoice) private readonly dbContext: Repository<Invoice>) {
    super();
  }

  public async create(entity: Partial<Invoice>): Promise<Invoice> {
    return await this.dbContext.save(entity);
  }

  public async delete(id: number): Promise<Invoice> {
    const result = await this.dbContext.delete({ invoiceId: id });
    return result.raw;
  }

  public async exists(id: number): Promise<boolean> {
    return await this.dbContext.count({ where: { invoiceId: id } }) > 0;
  }

  public async read(id: number): Promise<Nullable<Invoice>> {
    try{
      return await this.dbContext.findOne({ where: { invoiceId: id },relations: ['trip'] });
    }catch (e) {
      return null;
    }
  }

  public async readAll(): Promise<Invoice[]> {
    return await this.dbContext.find();
  }

  public async update(entity: Invoice): Promise<Invoice> {
    return await this.dbContext.save(entity);
  }
}