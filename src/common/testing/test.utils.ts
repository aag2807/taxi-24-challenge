import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { mergeDeep } from '../lib/funtions/util-functions';
import { DriverRepository } from '../../boundaries/persistance/repositories/driver/driver.repository';
import { MockDriverRepository } from './mock-repositories/driver.repository.mock';
import { InvoiceRepository } from '../../boundaries/persistance/repositories/invoice/invoice.repository';
import { MockInvoiceRepository } from './mock-repositories/invoice.repository.mock';
import { PassengerRepository } from '../../boundaries/persistance/repositories/passenger/passenger.repository';
import { MockPassengerRepository } from './mock-repositories/passenger.repository.mock';
import { TripRepository } from '../../boundaries/persistance/repositories/trips/trip.repository';
import { MockTripRepository } from './mock-repositories/trip.repository.mock';

export class TestUtils {
  public static async configureTestingModule(moduleDef: Partial<ModuleMetadata>): Promise<TestingModule> {
    const config: ModuleMetadata = mergeDeep({
      providers: [
        {
          provide: DriverRepository,
          useFactory: () => new MockDriverRepository(),
        },
        {
          provide: InvoiceRepository,
          useFactory: () => new MockInvoiceRepository(),
        },
        {
          provide: PassengerRepository,
          useFactory: () => new MockPassengerRepository(),
        },
        {
          provide: TripRepository,
          useFactory: () => new MockTripRepository(),
        },
      ],
    }, moduleDef);

    return await Test.createTestingModule(config).compile();
  }
}