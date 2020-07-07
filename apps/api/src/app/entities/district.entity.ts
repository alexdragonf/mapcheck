import { Map } from 'leaflet';
import { DistrictInterface } from '@mapcheck/api-interfaces';
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ValueTransformer,
} from 'typeorm';
// import { Polygon, Feature } from "geojson";

class GeoJSONFeatureTransformer implements ValueTransformer {
  to(value: GeoJSON.Geometry): string {
    return JSON.stringify(value);
  }

  from(value: string): GeoJSON.Geometry {
    console.log(value);

    return JSON.parse(value);
  }
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

@Entity({
  name: 'districts',
})
export class DistrictEntity extends BaseEntity implements DistrictInterface {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    // transformer: new GeoJSONFeatureTransformer(),
    type: 'text',
  })
  geojson: GeoJSON.Feature;

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
