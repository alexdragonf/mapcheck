import { DistrictInterface } from '@mapcheck/api-interfaces';
import {Entity, PrimaryColumn, Column, BaseEntity, ValueTransformer} from "typeorm";
// import  * as wkx  from "wkx";
import { Polygon, Feature } from "geojson";

class GeoJSONFeatureTransformer implements ValueTransformer {
    to(value: GeoJSON.Feature): string  { 
        return JSON.stringify(value)
    }

    from (value: string): GeoJSON.Feature {
        return JSON.parse(value)
    }
}

class PolygonTransformer implements ValueTransformer {
    to(value: any): string  { 
        console.log(value);
        // const m = value;
        const m = JSON.parse(value);
        let strVal = '('
        console.log('-----------------------------');
        console.log(value);
        console.log(m); 

        console.log('-----------------------------');
        m.forEach(x => {
            strVal += `(${x[0]},${x[1]}),`
            console.log(x);
            
        });
        strVal = strVal.substr(0,strVal.length-1)
        strVal +=')'
        console.log(strVal);
        
        console.log('-----------------------------');
        
        return strVal;
    }

    // to(value) {
    //     return wkx.Geometry.parseGeoJSON(value)
    // }

    from (value): GeoJSON.Polygon {
        return value
        // return null
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

