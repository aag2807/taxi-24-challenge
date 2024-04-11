import { Controller, Get } from '@nestjs/common';
import { DriverRepository } from '../../boundaries/persistance/repositories/driver/driver.repository';
import { DriverService } from '../../core/driver/services/driver.service';

@Controller('driver')
export class DriverController {
  constructor( private readonly driverService: DriverService) {
  }

  @Get()
  public async getDrivers() {
    return this.driverService.getDrivers();
  }
}
