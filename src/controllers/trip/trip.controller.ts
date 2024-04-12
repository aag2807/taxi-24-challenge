import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TripService } from '../../core/trip/services/trip.service';
import { TripResponse } from '../../core/trip/aggregates/trip-response.aggregate';
import { CreateTrip } from '../../core/trip/aggregates/create-trip.aggregate';
import { ArgumentGuard } from '../../common/lib/argument/argument-guard';

@ApiTags('Trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {
  }

  @ApiOperation({ summary: 'Get\'s all trips' })
  @ApiOkResponse({ description: 'Get\'s all trips', type: () => TripResponse })
  @Get('/all')
  public async getAllTrips(): Promise<TripResponse[]> {
    return await this.tripService.getAllTrips();
  }

  @ApiOperation({ summary: 'Get\'s all active trips' })
  @ApiOkResponse({ description: 'Get\'s all active trips', type: () => TripResponse })
  @Get('/all/active')
  public async getAllActiveTrips(): Promise<TripResponse[]> {
    return await this.tripService.getAllActiveTrips();
  }

  @ApiOperation({ summary: 'Create a trip' })
  @ApiOkResponse({ description: 'Create a trip' })
  @HttpCode(202)
  @Post('/create')
  public async createTrip(@Body() createTripDto: CreateTrip): Promise<any>
  {
    ArgumentGuard.notNull(createTripDto, 'createTripDto cannot be null to create a trip');

    return await this.tripService.createTrip(createTripDto);
  }
}
