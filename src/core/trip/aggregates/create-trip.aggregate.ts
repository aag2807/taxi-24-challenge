import { Coordinate } from '../../../common/models/coordinates.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrip {
  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public driverId: number;

  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public passengerId: number;

  @ApiProperty({ example: { latitude: 34.0522, longitude: -118.2437 }, description: 'The start location of the trip.' })
  public startLocation: Coordinate;

  @ApiProperty({ example: { latitude: 34.0522, longitude: -118.2437 }, description: 'The end location of the trip.' })
  public endLocation: Coordinate;

  @ApiProperty({ example: '2021-01-01T00:00:00', description: 'The start time of the trip.' })
  public startTime: Date;
}