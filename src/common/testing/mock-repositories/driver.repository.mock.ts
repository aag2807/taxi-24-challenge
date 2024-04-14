import { BaseRepository } from '../../../boundaries/persistance/repositories/base.repository';
import { Driver } from '../../../core/driver/models/driver.entity';
import { IDriverRepository } from '../../../boundaries/persistance/repositories/driver/driver-repository.interface';

export class MockDriverRepository extends BaseRepository<Driver> implements IDriverRepository {
  private inMemoryDb: Driver[] = [];

  public async create(entity: Partial<Driver>): Promise<Driver> {
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

  public async delete(id: number): Promise<Driver> {
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

  public async exists(id: number): Promise<boolean> {
    return new Promise((res) => {
      const driver = this.inMemoryDb.find(d => d.driverId === id);
      if (driver) {
        res(true);
      } else {
        res(false);
      }
    });
  }

  public async read(id: number): Promise<Driver> {
    return new Promise((res) => {
      const driver = this.inMemoryDb.find(d => d.driverId === id);
      if (driver) {
        res(driver);
      } else {
        res(null);
      }
    });
  }

  public async readAll(): Promise<Driver[]> {
    return Promise.resolve(this.inMemoryDb);
  }

  public async update(entity: Driver): Promise<Driver> {
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
    });
  }

  public async getAllActiveDrivers(): Promise<Driver[]> {
    return new Promise((res) => {
      res(this.inMemoryDb.filter(d => d.isActive));
    });
  }

  public async findNearbyDrivers(queryLat: number, queryLon: number, radius: number): Promise<Driver[]> {
    const radiusInDegrees = radius / 111000; // Approximate conversion from meters to degrees at the equator
    return new Promise((res) => {
      const nearbyDrivers = this.inMemoryDb.filter(driver => {
        const [driverLon, driverLat] = driver.location.coordinates;
        const distance = Math.sqrt(
          Math.pow(driverLat - queryLat, 2) + Math.pow(driverLon - queryLon, 2) * Math.cos(Math.PI / 180 * queryLat),
        );
        return distance < radiusInDegrees && driver.isActive;
      });
      res(nearbyDrivers);
    });
  }

  public async findClosestDrivers(queryLat: number, queryLon: number, entriesToReturn: number): Promise<Driver[]> {
    return new Promise((res) => {
      const driversWithDistances = this.inMemoryDb.filter(driver => driver.isActive).map(driver => {
        const [driverLon, driverLat] = driver.location.coordinates;
        const distance = Math.sqrt(
          Math.pow(driverLat - queryLat, 2) +
          Math.pow(driverLon - queryLon, 2),
        );
        return { driver, distance };
      });

      // Sort drivers by distance and return the top three
      const closestDrivers = driversWithDistances.sort((a, b) => a.distance - b.distance).slice(0, entriesToReturn).map(item => item.driver);
      res(closestDrivers);
    });
  }

  public async isDriverActive(driverId: number): Promise<boolean> {
    return Promise.resolve(this.inMemoryDb.some(driver => driver.driverId === driverId && driver.isActive));
  }
}