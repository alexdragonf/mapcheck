import { HouseEntity } from './entities/house.entity';
import { StreetService } from './services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreetController, HouseController } from './controllers';
import { StreetEntity } from './entities';

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
      entities: [StreetEntity, HouseEntity],
    }),
  ],
  controllers: [StreetController, HouseController],
  providers: [StreetService],
})
export class AppModule {}
