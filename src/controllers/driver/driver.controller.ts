import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverService } from '../../core/driver/services/driver.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StateGuard } from '../../common/lib/state/state-guard';
import { DriverResponse } from '../../core/driver/aggregates/driver-response.aggregate';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {
  }

  @ApiOperation({ summary: 'Get\'s all drivers' })
  @ApiOkResponse({ description: 'All drivers', type: () => DriverResponse })
  @Get('/all')
  public async getDrivers(): Promise<DriverResponse[]> {
    return await this.driverService.getDrivers();
  }

  @Get('/all/active')
  @ApiOperation({ summary: 'Get\'s all active drivers' })
  @ApiOkResponse({ description: 'All active drivers', type: () => DriverResponse })
  public async getAllActiveDrivers(): Promise<DriverResponse[]> {
    return this.driverService.getAllActiveDrivers();
  }

  @Get('/all/nearby')
  @ApiOperation({ summary: 'Get\'s all drivers in a 3km radius' })
  @ApiOkResponse({ description: 'All drivers in proximity', type: () => DriverResponse })
  public async getDriversInKmRadius(@Query('latitude') lat: string, @Query('longitude') lon: string): Promise<DriverResponse[]> {
    StateGuard.isTrue(!!lat, 'latitude has to be provided to get drivers in radius');
    StateGuard.isTrue(!!lon, 'longitude has to be provided to get drivers in radius');

    return await this.driverService.getDriversInKmRadius(parseFloat(lat), parseFloat(lon), 3);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get driver by id' })
  @ApiOkResponse({ description: 'Driver', type: () => DriverResponse })
  public async getDriverById(@Param('id') id: number): Promise<DriverResponse> {
    StateGuard.isTrue(!!id, 'id cannot be null or undefined to get a driver');

    return await this.driverService.getDriverById(+id);
  }
}
