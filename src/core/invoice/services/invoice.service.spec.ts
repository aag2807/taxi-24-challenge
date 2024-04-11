import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { TestUtils } from '../../../common/testing/test.utils';
import { InvoiceRepository } from '../../../boundaries/persistance/repositories/invoice/invoice.repository';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let invoiceRepository: InvoiceRepository;

  beforeEach(async () => {
    const module: TestingModule = await  TestUtils.configureTestingModule({
      providers: [InvoiceService],
    });

    service = module.get<InvoiceService>(InvoiceService);
    invoiceRepository = module.get<InvoiceRepository>(InvoiceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
