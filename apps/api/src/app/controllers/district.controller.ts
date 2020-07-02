import { DistrictEntity } from './../entities';
import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { DistrictInterface } from "@mapcheck/api-interfaces";
import { EntityManager, Transaction, TransactionManager } from "typeorm";


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
                // x.polygon = null;
                return x
            })
    }

    @Post()
    @Transaction()
    async postData(
        @Body() 
        districts: DistrictInterface[],
        @TransactionManager() entityManager: EntityManager
    ) { 
      if (districts && districts.length) {
          await districts.forEach(async x => {
            //   x.polygon = (!x.polygon) ? x.geojson['coordinates'] : x.polygon;
            //   x.polygon = <Polygon>x.geojson.coordinates.;

            //   console.log(x.geojson['coordinates'].toString());
              x.geojson
              const district = x.id ? await entityManager.findOne(DistrictEntity,x.id) : new DistrictEntity();
              await entityManager.merge(DistrictEntity, district, x)
              await entityManager.save(district)
            //   entityManager.queryRunner.up
          })
      }
    }

}