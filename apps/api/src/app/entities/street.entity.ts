import { IStreet } from '@mapcheck/api-interfaces';
import {Entity, PrimaryColumn, Column, BaseEntity} from "typeorm";

@Entity({
    name: 'street'
})
export class StreetEntity  extends BaseEntity implements IStreet   {
    
    @PrimaryColumn({
        name: 'pk'
    })
    id: number;


    @Column({
        name: 'full_name'
    })
    fullName: string;
}