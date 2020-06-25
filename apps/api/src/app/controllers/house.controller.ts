import { HouseEntity } from './../entities';
// import { StreetService } from './../services';
import { Controller, Get, Query } from '@nestjs/common';
import { HouseInterface } from '@mapcheck/api-interfaces';


@Controller('house')
export class HouseController {
//   constructor(private readonly streetService: StreetService) {}

  @Get()
  async getData(@Query('street-id') streetId: number): Promise<HouseInterface[]> {
    if (!streetId) {
      return [];
    } else {
      return HouseEntity.find({
          where:{streetId},
          order: {house: 'ASC'}
      })
    };
  }
}
