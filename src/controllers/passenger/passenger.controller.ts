import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from '../../core/passenger/services/passenger.service';
import { ArgumentGuard } from '../../common/lib/argument/argument-guard';
import { GetClosesDriversRequest } from '../../core/passenger/models/aggregates/get-closest-drivers.aggregate';
import { PassengerResponse } from '../../core/passenger/aggregates/passenger-response.aggregate';
import { DriverResponse } from '../../core/driver/aggregates/driver-response.aggregate';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {
  }

  @ApiOperation({ summary: 'Get\'s all passengers' })
  @ApiOkResponse({ description: 'All passengers', type: () => PassengerResponse })
  @Get('/all')
  public async getAllPassengers(): Promise<PassengerResponse[]> {
    return await this.passengerService.getAllPassengers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get passenger by id' })
  @ApiOkResponse({ description: 'Passenger', type: () => PassengerResponse })
  public async getPassengerById(@Param('id') id: number): Promise<PassengerResponse> {
    ArgumentGuard.notNull(id, 'id cannot be null to get a passenger');

    return await this.passengerService.getPassengerById(+id);
  }

  @Post('/get-nearby-drivers')
  @ApiOperation({ summary: 'Gets the 3 closest drivers to the passengers location' })
  @ApiOkResponse({ description: 'Closest 3 drivers in proximity', type: () => DriverResponse })
  @HttpCode(200)
  public async getClosestDrivers(@Body() request: GetClosesDriversRequest): Promise<DriverResponse[]>{
    ArgumentGuard.notNull(request, 'request cannot be null to get closest drivers');

    return await this.passengerService.get3ClosestDriversToPassengerLocation(request);
  }
}
