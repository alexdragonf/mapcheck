import { HouseInterface } from '@mapcheck/api-interfaces';
import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity({
    name: 'coords'
})
export class HouseEntity  extends BaseEntity implements HouseInterface   {
    
    @PrimaryColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'street_id_n'
    })
    streetId: number;

    @Column({
        name: 'dom_n',
        nullable: true
    })
    house: string;

    @Column({nullable: true})
    lat: number;

    @Column({nullable: true})
    lon: number;

    @Column()
    zone: number;

    @Column()
    district: number;
}