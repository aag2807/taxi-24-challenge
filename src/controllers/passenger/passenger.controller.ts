import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from '../../core/passenger/services/passenger.service';
import { Passenger } from '../../core/passenger/models/passenger.entity';
import { ArgumentGuard } from '../../common/lib/argument/argument-guard';
import { GetClosesDriversRequest } from '../../core/passenger/models/aggregates/get-closest-drivers.aggregate';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {
  }

  @ApiOperation({ summary: 'Get\'s all passengers' })
  @ApiOkResponse({ description: 'All passengers', type: Passenger })
  @Get('/all')
  public async getAllPassengers(): Promise<Passenger[]> {
    return await this.passengerService.getAllPassengers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get passenger by id' })
  @ApiOkResponse({ description: 'Passenger', type: Passenger })
  public async getPassengerById(@Param('id') id: number): Promise<Passenger> {
    ArgumentGuard.notNull(id, 'id cannot be null to get a passenger');

    return await this.passengerService.getPassengerById(+id);
  }

  @Post('/get-nearby-drivers')
  @ApiOperation({ summary: 'Gets the 3 closest drivers to the passengers location' })
  @ApiOkResponse({ description: 'Closest 3 drivers in proximity', type: Passenger })
  public async getClosesDriver(@Body() request: GetClosesDriversRequest){
    ArgumentGuard.notNull(request, 'request cannot be null to get closest drivers');

    return await this.passengerService.get3ClosestDriversToPassengerLocation(request);
  }
}
