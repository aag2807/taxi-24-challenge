import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../../boundaries/persistance/repositories/driver/driver.repository';

@Injectable()
export class DriverService {
  constructor(private readonly repo: DriverRepository)
  {
  }

  public async getDrivers() {
    return this.repo.readAll();
  }
}
