import { ApiProperty } from '@nestjs/swagger';

export class PassengerResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public passengerId: number;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the passenger.' })
  public fullName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the passenger.' })
  public email: string;

  @ApiProperty({ example: '555-1234', description: 'Phone number of the passenger.', required: false })
  public phoneNumber?: string;

  @ApiProperty({ example: [], description: 'List of trips the passenger has taken.' })
  public trips: any[];

  public static fromEntity(entity: any): PassengerResponse {
    const response: PassengerResponse = new PassengerResponse();
    response.passengerId = entity.passengerId;
    response.fullName = entity.fullName;
    response.email = entity.email;
    response.phoneNumber = entity.phoneNumber;
    response.trips = entity.trips;

    return response;
  }

  public static fromEntities(entities: any[]): PassengerResponse[] {
    return entities.map((entity: any) => PassengerResponse.fromEntity(entity));
  }
}
