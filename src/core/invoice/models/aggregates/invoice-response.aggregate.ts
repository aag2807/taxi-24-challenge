import { Nullable } from '../../../../common/types/common.types';
import { ApiProperty } from '@nestjs/swagger';
import { Invoice } from '../invoice.entity';

export class InvoiceResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public invoiceId: number;

  @ApiProperty({ example: 100, description: 'Amount of the invoice.' })
  public amount: number;

  @ApiProperty({ example: new Date(), description: 'Date when the invoice was issued.' })
  public issueDate: Date;

  @ApiProperty({ example: new Date(), description: 'Date when the invoice was paid.' })
  public paidDate: Nullable<Date>;

  @ApiProperty({ example: 'Pending', description: 'Status of the payment.' })
  public paymentStatus: Nullable<'Paid' | 'Pending' | 'Canceled'>;

  @ApiProperty({ example: 1, description: 'Unique identifier of the trip.' })
  public tripId: number;

  @ApiProperty({ example: 1, description: 'Unique identifier of the passenger.' })
  public passengerId: number = 0;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the passenger.' })
  public passengerName: string = '';

  @ApiProperty({ example: 1, description: 'Unique identifier of the driver.' })
  public driverId: number = 0;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the driver.' })
  public driverName: string = '';

  public static fromEntity(entity: Invoice): InvoiceResponse {
    const response: InvoiceResponse = new InvoiceResponse();
    response.invoiceId = entity.invoiceId;
    response.amount = entity.amount;
    response.issueDate = entity.issueDate;
    response.paymentStatus = entity.paymentStatus;
    response.tripId = entity.tripId;
    response.paidDate = entity.paidDate;

    if (entity.trip) {
      response.passengerId = entity.trip.passengerId;
      response.passengerName = entity.trip.passenger.fullName;
      response.driverId = entity.trip.driverId;
      response.driverName = entity.trip.driver.fullName;
    }

    return response;
  }
}