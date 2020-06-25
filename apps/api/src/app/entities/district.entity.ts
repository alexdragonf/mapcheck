import { DistrictInterface } from '@mapcheck/api-interfaces';
import {Entity, PrimaryColumn, Column, BaseEntity, ValueTransformer} from "typeorm";
// import { Polygon, Feature } from "geojson";

class GeoJSONFeatureTransformer implements ValueTransformer {
    to(value: GeoJSON.Feature): string  { 
        return JSON.stringify(value)
    }

    from (value: string): GeoJSON.Feature {
        return JSON.parse(value)
    }
}

@Entity({
    name: 'districts'
})
export class DistrictEntity  extends BaseEntity implements DistrictInterface   {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        transformer: new GeoJSONFeatureTransformer(),
        type: 'text'
    })
    geojson: GeoJSON.Feature;

    @Column({ 
        name: 'parent_id'
    })
    parentId: number;

    @Column({
        name: 'district_type'
    })
    districtType: number;

    @Column({
        type: 'polygon'
    })
    polygon: GeoJSON.Polygon;

    @Column()
    comment: string
}

