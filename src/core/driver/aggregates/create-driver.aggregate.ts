import { Driver } from '../models/driver.entity';

export class CreateDriver
{
  public fullName: string;
  public licenseNumber: string;
  public email: string;
  public phoneNumber: string;

  public toEntity(): Driver
  {
    const driver = new Driver();
    driver.fullName = this.fullName;
    driver.licenseNumber = this.licenseNumber;
    driver.email = this.email;
    driver.phoneNumber = this.phoneNumber;
    driver.isActive = true;

    return driver;
  }
}