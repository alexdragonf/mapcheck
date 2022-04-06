import { Body, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HouseInterface } from '@mapcheck/api-interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config'

// @Injectable({
//     providedIn: 'root'
// })
@Injectable()
export class HouseService {
    private apiURL: string
    constructor(
        private http: HttpClient, 
        private config: AppConfig) {
            this.apiURL = this.config.apiEndpoint.concat('/street');

        }

    getByStreetId(id: number): Observable<HouseInterface[]> {
        return this.http.get<HouseInterface[]>(this.apiURL.concat(`/streeet?street-id=${id}`))
    }
}