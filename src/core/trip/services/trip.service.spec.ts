import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { TestUtils } from '../../../common/testing/test.utils';

describe('TripService', () => {
  let service: TripService;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      providers: [TripService],
    });

    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
