import { DistrictEntity } from './../entities';
<<<<<<< Updated upstream
<<<<<<< HEAD
import { Controller, Get, Query, Body, Post } from '@nestjs/common';
=======
import { Controller, Get, Query, Body, Post, Delete } from '@nestjs/common';
>>>>>>> Stashed changes
import { DistrictInterface } from "@mapcheck/api-interfaces";
import { EntityManager, Transaction, TransactionManager } from "typeorm";

@Controller('district')
export class DistrictController {
  @Get()
  async getData(
    @Query('district-type') districtType: number,
    @Query('fields') fields: string = 'all',
    @Query('id') id: number
  ): Promise<DistrictEntity[]> {
    return (
      await DistrictEntity.find({
        where: [{ districtType }, { id }],
      })
    ).map((x) => {
    //   x.polygon = null;
      return x;
    });
  }

  @Post()
  @Transaction()
  async postData(
      @Body() districts: DistrictInterface[],
      @TransactionManager() entityManager: EntityManager
      ) {
        // console.log("districts:",districts)
        if (districts && districts.length) {
          for await (const x of districts) {
            x.polygon = (!x.polygon) ? <GeoJSON.Polygon>x.geojson.geometry : x.polygon;
            const district = x.id ? await entityManager.findOne(DistrictEntity,x.id) : new DistrictEntity();
            await entityManager.merge(DistrictEntity, district, x)
            await entityManager.save(district)
          }
        }
      }
      
  @Delete()
  @Transaction()
  async deleteData(
        @Body() ids: number[],
        @TransactionManager() entityManager: EntityManager
    ) {
    console.log(ids);
    for await (const x of ids) {
      entityManager.delete(DistrictEntity, {id:x})
    }
<<<<<<< Updated upstream

}
=======
import { Controller, Get, Query, Body, Post, Delete } from '@nestjs/common';
import { DistrictInterface } from "@mapcheck/api-interfaces";
import { EntityManager, Transaction, TransactionManager } from "typeorm";

@Controller('district')
export class DistrictController {
  @Get()
  async getData(
    @Query('district-type') districtType: number,
    @Query('fields') fields: string = 'all',
    @Query('id') id: number
  ): Promise<DistrictEntity[]> {
    return (
      await DistrictEntity.find({
        where: [{ districtType }, { id }],
      })
    ).map((x) => {
    //   x.polygon = null;
      return x;
    });
  }

  @Post()
  @Transaction()
  async postData(
      @Body() districts: DistrictInterface[],
      @TransactionManager() entityManager: EntityManager
      ) {
        // console.log("districts:",districts)
        if (districts && districts.length) {
          for await (const x of districts) {
            x.polygon = (!x.polygon) ? <GeoJSON.Polygon>x.geojson.geometry : x.polygon;
            const district = x.id ? await entityManager.findOne(DistrictEntity,x.id) : new DistrictEntity();
            await entityManager.merge(DistrictEntity, district, x)
            await entityManager.save(district)
          }
        }
      }
      
  @Delete()
  @Transaction()
  async deleteData(
        @Body() ids: number[],
        @TransactionManager() entityManager: EntityManager
    ) {
    console.log(ids);
    for await (const x of ids) {
      entityManager.delete(DistrictEntity, {id:x})
    }
  }
}
>>>>>>> 46ab34a6c6f6302e75fdacbde3e5aab6ee3e20f8
=======
  }
}
>>>>>>> Stashed changes
