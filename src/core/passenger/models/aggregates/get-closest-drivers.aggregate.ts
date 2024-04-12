import { ApiProperty } from '@nestjs/swagger';

export class GetClosesDriversRequest {
  @ApiProperty({
    example: 1,
    description: 'The ID of the passenger requesting nearby drivers'
  })
  public passengerId: number;

  @ApiProperty({
    example: 34.0522,
    description: 'Latitude of the passenger\'s location'
  })
  public latitude: number;

  @ApiProperty({
    example: -118.2437,
    description: 'Longitude of the passenger\'s location'
  })
  public longitude: number;
}
