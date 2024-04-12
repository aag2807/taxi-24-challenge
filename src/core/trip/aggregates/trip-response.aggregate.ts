import { ApiProperty } from '@nestjs/swagger';
import { Coordinate } from '../../../common/models/coordinates.model';
import { Trip } from '../models/trip.entity';

export class TripResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public tripId: number;

  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public driverId: number;

  @ApiProperty({ example: '123456', description: 'Driver license number.' })
  public driverName: string;

  @ApiProperty({ example: '123456', description: 'Driver license number.' })
  public passengerId: number;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the passenger.' })
  public passengerName: string;

  @ApiProperty({ example: { latitude: 34.0522, longitude: -118.2437 }, description: 'The start location of the trip.' })
  public startLocation: Coordinate;
  
  @ApiProperty({ example: { latitude: 34.0522, longitude: -118.2437 }, description: 'The end location of the trip.' })
  public endLocation: Coordinate;
  
  @ApiProperty({ example: '2021-01-01T00:00:00', description: 'The start time of the trip.' })
  public startTime: Date;
  
  @ApiProperty({ example: '2021-01-01T00:00:00', description: 'The end time of the trip.' })
  public endTime: Date;
  
  @ApiProperty({ example: 'Active', description: 'The status of the trip.' })
  public status: string;
  
  @ApiProperty({ example: 1, description: 'The invoice id of the trip.' })
  public invoiceId?: number;
  
  public static fromEntity(entity: Trip): TripResponse {
    const response: TripResponse = new TripResponse();
    response.tripId = entity.tripId;
    response.driverId = entity?.driver?.driverId || 0;
    response.driverName = entity?.driver?.fullName || '';
    response.passengerId = entity?.passenger?.passengerId || 0;
    response.passengerName = entity?.passenger?.fullName || '';
    response.startTime = entity.startTime;
    response.endTime = entity.endTime;
    response.status = entity.status;
    response.invoiceId = entity?.invoice?.invoiceId ?? 0;
    
    const [startLon, startLat] = entity.startLocation.coordinates;
    response.startLocation = new Coordinate(startLat, startLon);
    
    const [endLon, endLat] = entity.startLocation.coordinates;
    response.endLocation = new Coordinate(endLat, endLon);

    return response;
  }

  public static fromEntities(entities: Trip[]): TripResponse[] {
    return entities.map((entity: Trip) => TripResponse.fromEntity(entity));
  }
}