import { Driver } from '../models/driver.entity';
import { Coordinate } from '../../../common/models/coordinates.model';
import { ApiProperty } from '@nestjs/swagger';

export class DriverResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public driverId: number;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the passenger.' })
  public fullName: string;

  @ApiProperty({ example: '123456', description: 'Driver license number.' })
  public licenseNumber: string;

  @ApiProperty({ example: '', description: 'Email address of the driver.' })
  public email: string;

  @ApiProperty({ example: '555-1234', description: 'Phone number of the driver.', required: false })
  public phoneNumber: string;

  @ApiProperty({ example: true, description: 'Whether the driver is active or not.' })
  public isActive: boolean;

  @ApiProperty({ example: { latitude: 34.0522, longitude: -118.2437 }, description: 'Location of the driver.' })
  public location: Coordinate;

  public static fromEntity(entity: Driver): DriverResponse {
    const response: DriverResponse = new DriverResponse();
    response.driverId = entity.driverId;
    response.fullName = entity.fullName;
    response.licenseNumber = entity.licenseNumber;
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.isActive = entity.isActive;

    const [lon, lat] = entity.location.coordinates;
    response.location = new Coordinate(lat, lon);

    return response;
  }

  public static fromEntities(entities: Driver[]): DriverResponse[] {
    return entities.map((entity: Driver) => DriverResponse.fromEntity(entity));
  }
}