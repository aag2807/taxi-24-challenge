import { Invoice } from '../../../../core/invoice/models/invoice.entity';
import { IBaseRepository } from '../../base-repository.interface';

export interface IInvoiceRepository extends IBaseRepository<Invoice>
{
}