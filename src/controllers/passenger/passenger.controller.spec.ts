import { TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { TestUtils } from '../../common/testing/test.utils';
import { INestApplication } from '@nestjs/common';
import { PassengerRepository } from '../../boundaries/persistance/repositories/passenger/passenger.repository';
import { PassengerService } from '../../core/passenger/services/passenger.service';
import * as request from 'supertest';
import { DriverService } from '../../core/driver/services/driver.service';
import { Passenger } from '../../core/passenger/models/passenger.entity';

describe('PassengerController', () => {
  let app: INestApplication;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await TestUtils.configureTestingModule({
      controllers: [PassengerController],
      providers: [PassengerService, DriverService],
    });

    app = module.createNestApplication();
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return an empty array if no passengers are saved when trying to get all passengers', () => {
    return request(app.getHttpServer())
      .get('/passenger/all')
      .expect(200)
      .expect([]);
  });

  it('should return all passengers available', async () => {
    const passenger_1: Passenger = await passengerRepository.create({
      fullName: 'passenger 1',
      email: 'passenger1@email.com',
      phoneNumber: '1234567890',
    });
    const passenger_2: Passenger = await passengerRepository.create({
      fullName: 'passenger 2',
      email: 'passenger2',
      phoneNumber: '0987654321',
    });

    return request(app.getHttpServer())
      .get('/passenger/all')
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).toHaveLength(2);
        expect(body[0].fullName).toBe(passenger_1.fullName);
        expect(body[1].fullName).toBe(passenger_2.fullName);
      });
  });

  it('should return a passenger by id', async () => {
    await passengerRepository.create({
      fullName: 'passenger 1',
      email: 'passenger1@email.com',
      phoneNumber: '1234567890',
    });

    return request(app.getHttpServer())
      .get('/passenger/1')
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body.fullName).toBe('passenger 1');
      });
  });

  it('should return a 404 http status code and error messsage if passenger is not found', async () => {
    return request(app.getHttpServer())
      .get('/passenger/1')
      .expect(404)
      .then((response) => {
        const body = response.body;
        expect(body.message).toBe('Passenger not found');
      });
  });

  it('should return a 400 http status code and error message if id is 0', async () => {
    return request(app.getHttpServer())
      .get('/passenger/0')
      .expect(400)
      .then((response) => {
        const body = response.body;
        expect(body.message).toBe('id must be greater than 0');
      });
  });
});
