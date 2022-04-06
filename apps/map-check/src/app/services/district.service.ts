import { Body, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DistrictInterface } from '@mapcheck/api-interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DistrictService {
    apiURL = '/api/district';
    constructor(private http: HttpClient) {}

    getDistrictsById(id: number): Observable<DistrictInterface[]> {
        return this.http.get<DistrictInterface[]>(this.apiURL.concat(`?id=${id}`))
    }
    
    getDistrictsByType(type: number): Observable<DistrictInterface[]> {
        return this.http.get<DistrictInterface[]>(this.apiURL.concat(`?district-type=${type}`))
    }

    postDistrict(district: Partial<DistrictInterface[]>) {
        console.log(district);
        
        return this.http.post(this.apiURL, district, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    deleteDistrict(ids: number[]) {
        return this.http.request('delete', this.apiURL, {
            body: ids,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

}