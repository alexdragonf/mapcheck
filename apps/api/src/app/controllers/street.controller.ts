import { StreetEntity } from './../entities';
import { StreetService } from './../services';
import { Controller, Get } from '@nestjs/common';
import { IStreet } from '@mapcheck/api-interfaces';


@Controller('street')
export class StreetController {
  constructor(private readonly streetService: StreetService) {}

  @Get()
  async getData(): Promise<IStreet[]> {
    return StreetEntity.find({
      order: {fullName: 'ASC'}
    });
  }
}
