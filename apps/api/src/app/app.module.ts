import { StreetService } from './services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  StreetController,
  HouseController,
  DistrictController,
} from './controllers';
import { StreetEntity, HouseEntity, DistrictEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'geoscan_dev',
      synchronize: false,
      logging: true,
      entities: [StreetEntity, HouseEntity, DistrictEntity],
    }),
  ],
  controllers: [StreetController, HouseController, DistrictController],
  providers: [StreetService],
})
export class AppModule {}
