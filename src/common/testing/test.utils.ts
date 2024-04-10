import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { TestingModuleBuilder } from '@nestjs/testing/testing-module.builder';
import { Test, TestingModule } from '@nestjs/testing';
import { mergeDeep } from '../lib/funtions/util-functions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../core/driver/models/driver.entity';
import { Passenger } from '../../core/passenger/models/passenger.entity';
import { Trip } from '../../core/trip/models/trip.entity';
import { Invoice } from '../../core/invoice/models/invoice.entity';

export class TestUtils {
  public static async configureTestingModule(moduleDef: Partial<ModuleMetadata>): Promise<TestingModule> {
    const config: ModuleMetadata = mergeDeep({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Driver, Passenger, Trip, Invoice],
          logging: true,
          synchronize: true,
        })
      ],
    }, moduleDef);

    return await Test.createTestingModule(config).compile();
  }
}