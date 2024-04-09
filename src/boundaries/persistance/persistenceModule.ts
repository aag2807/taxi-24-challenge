import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     port: 5432,
  //     username: 'user',
  //     password: 'password',
  //     database: 'db',
  //     host:'localhost',
  //     synchronize: true,
  //     entities: [],
  //   }),
  // ]
})
export class PersistenceModule {}
