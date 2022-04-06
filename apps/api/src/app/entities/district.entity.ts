import { Map } from 'leaflet';
import { DistrictInterface } from '@mapcheck/api-interfaces';
<<<<<<< Updated upstream
<<<<<<< HEAD
import {Entity, PrimaryColumn, Column, BaseEntity, ValueTransformer} from "typeorm";
// import  * as wkx  from "wkx";
=======
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ValueTransformer,
} from 'typeorm';
>>>>>>> Stashed changes
import { Polygon, Feature } from "geojson";
=======
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ValueTransformer,
} from 'typeorm';
// import { Polygon, Feature } from "geojson";
>>>>>>> 46ab34a6c6f6302e75fdacbde3e5aab6ee3e20f8

class GeoJSONFeatureTransformer implements ValueTransformer {
  to(value: GeoJSON.Geometry): string {
    return JSON.stringify(value);
  }

  from(value: string): GeoJSON.Geometry {
    console.log(value);

    return JSON.parse(value);
  }
<<<<<<< Updated upstream
}

class PolygonTransformer implements ValueTransformer {
  to(value: GeoJSON.Polygon) {
    return value.coordinates[0]
      .map((x) => `(${x[0]},${x[1]}),`)
      .reduce((s, x) => s.concat(x),'(')
      .slice(0,-1)
      .concat(')');
  }

  from(value: string) {
    return {
      type: 'Polygon',
      coordinates: [
        value
          .slice(1,-1)
          .split('),(')
          .map((x) => [x.split(',')[0], x.split(',')[1]]),
      ],
    };
  }
=======
>>>>>>> Stashed changes
}

class PolygonTransformer implements ValueTransformer {
  to(value: GeoJSON.Polygon) {
    return value.coordinates[0]
      .map((x) => `(${x[0]},${x[1]}),`)
      .reduce((s, x) => s.concat(x),'(')
      .slice(0,-1)
      .concat(')');
  }

  from(value: string) {
    return {
      type: 'Polygon',
      coordinates: [
        value
          .slice(1,-1)
          .split('),(')
          .map((x) => [x.split(',')[0], x.split(',')[1]]),
      ],
    };
  }
}

// class PolygonTransformer implements ValueTransformer {
//     to(value: any): string  { 
//         console.log(value);
//         // const m = value;
//         const m = JSON.parse(value);
//         let strVal = '('
//         console.log('-----------------------------');
//         console.log(value);
//         console.log(m); 

//         console.log('-----------------------------');
//         m.forEach(x => {
//             strVal += `(${x[0]},${x[1]}),`
//             console.log(x);
            
//         });
//         strVal = strVal.substr(0,strVal.length-1)
//         strVal +=')'
//         console.log(strVal);
        
//         console.log('-----------------------------');
        
//         return strVal;
//     }

//     // to(value) {
//     //     return wkx.Geometry.parseGeoJSON(value)
//     // }

//     from (value): GeoJSON.Polygon {
//         return value
//         // return null
//     }
// }

@Entity({
  name: 'districts',
})
<<<<<<< Updated upstream
<<<<<<< HEAD
export class DistrictEntity  extends BaseEntity implements DistrictInterface   {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        transformer: new GeoJSONFeatureTransformer(),
        type: 'text'
    })
    geojson: GeoJSON.Feature<Polygon>;

    @Column({ 
        name: 'parent_id'
    })
    parentId: number;

    @Column({
        name: 'district_type'
    })
    districtType: number;

    @Column({
        type: 'polygon',
        // insert: false,
        // update: false
        spatialFeatureType: 'polygon',
        transformer: new PolygonTransformer()
    })
    polygon: GeoJSON.Polygon;

    @Column()
    comment: string
}
=======
=======
>>>>>>> Stashed changes
export class DistrictEntity extends BaseEntity implements DistrictInterface {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
<<<<<<< Updated upstream
>>>>>>> 46ab34a6c6f6302e75fdacbde3e5aab6ee3e20f8

  @Column({
    // transformer: new GeoJSONFeatureTransformer(),
    type: 'text',
  })
  geojson: GeoJSON.Feature;
=======

  @Column({
    transformer: new GeoJSONFeatureTransformer(),
    type: 'text',
  })
  geojson: GeoJSON.Feature<Polygon>;
>>>>>>> Stashed changes

  @Column({
    name: 'parent_id',
  })
  parentId: number;

  @Column({
    name: 'district_type',
  })
  districtType: number;

  @Column({
    type: 'polygon',
    spatialFeatureType: 'Polygon',
    transformer: new PolygonTransformer(),
  })
  polygon: GeoJSON.Polygon;

  @Column()
  zone: number;

  @Column()
  comment: string;
}
