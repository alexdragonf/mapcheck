import { DistrictEntity } from './../entities';
import { Controller, Get, Query } from '@nestjs/common';
// import { And } from 'typeorm';
// import { DistrictInterface } from '@mapcheck/api-interfaces';


@Controller('district')
export class DistrictController {
    @Get()
    async getData(
        @Query('district-type') districtType: number,
        @Query('fields') fields: string = 'all',
        @Query('id') id: number,
    ): Promise<DistrictEntity[]> {
        return (await DistrictEntity.find({
            where:[
                { districtType },
                { id }
            ]
        })).map(x => {
                x.polygon = null;
                return x
            })
    }
}