import { BaseRepository } from '../../../boundaries/persistance/repositories/base.repository';
import { Driver } from '../../../core/driver/models/driver.entity';


export class MockDriverRepository extends BaseRepository<Driver> {
  private inMemoryDb: Driver[] = [];

  public create(entity: Partial<Driver>): Promise<Driver> {
    return new Promise((res) => {
      const driver: Driver = new Driver();
      driver.driverId = this.inMemoryDb.length + 1;
      driver.fullName = entity.fullName;
      driver.email = entity.email;
      driver.licenseNumber = entity.licenseNumber;
      driver.phoneNumber = entity.phoneNumber;
      driver.isActive = entity.isActive;
      driver.location = entity.location;
      driver.trips = entity.trips;
      this.inMemoryDb.push(driver);
      res(driver);
    });
  }

  public delete(id: number): Promise<Driver> {
    return new Promise((rej, res) => {
      const driver = this.inMemoryDb.find(d => d.driverId === id);
      if (driver) {
        this.inMemoryDb = this.inMemoryDb.filter(d => d.driverId !== id);
        res(driver);
      } else {
        rej(null);
      }
    });
  }

  public exists(id: number): Promise<boolean> {
    return new Promise((res) => {
      const driver = this.inMemoryDb.find(d => d.driverId === id);
      if (driver) {
        res(true);
      } else {
        res(false);
      }
    });
  }

  public read(id: number): Promise<Driver> {
    return new Promise((res, rej) => {
      const driver = this.inMemoryDb.find(d => d.driverId === id);
      if (driver) {
        res(driver);
      } else {
        rej(null);
      }
    })
  }

  public readAll(): Promise<Driver[]> {
    return new Promise( (res) => res(this.inMemoryDb));
  }

  public update(entity: Driver): Promise<Driver> {
    return new Promise((res, rej) => {
      const driver = this.inMemoryDb.find(d => d.driverId === entity.driverId);
      if (driver) {
        driver.fullName = entity.fullName;
        driver.email = entity.email;
        driver.licenseNumber = entity.licenseNumber;
        driver.phoneNumber = entity.phoneNumber;
        driver.isActive = entity.isActive;
        driver.location = entity.location;
        driver.trips = entity.trips;
        res(driver);
      } else {
        rej(null);
      }
    })
  }

  public getAllActiveDrivers(): Promise<Driver[]> {
    return new Promise((res) => {
      res(this.inMemoryDb.filter(d => d.isActive));
    });
  }
}