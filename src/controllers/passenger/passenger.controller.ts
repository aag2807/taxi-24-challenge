import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from '../../core/passenger/services/passenger.service';
import { Passenger } from '../../core/passenger/models/passenger.entity';
import { ArgumentGuard } from '../../common/lib/argument/argument-guard';

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
}
