import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { TestUtils } from '../../../common/testing/test.utils';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await  TestUtils.configureTestingModule({
      providers: [InvoiceService],
    });

    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
