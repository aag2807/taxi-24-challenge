import { Driver } from '../models/driver.entity';
import { Coordinate } from '../../../common/models/coordinates.model';

export class DriverResponse {
  public driverId: number;
  public fullName: string;
  public licenseNumber: string;
  public email: string;
  public phoneNumber: string;
  public isActive: boolean;
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
}