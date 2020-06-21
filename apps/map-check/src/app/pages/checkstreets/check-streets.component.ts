import { IStreet, IHouse } from '@mapcheck/api-interfaces';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { Marker, Icon } from 'leaflet';

@Component({
  selector: 'mapcheck-street',
  templateUrl: './check-streets.component.html',
  styleUrls: ['./check-streets.component.scss'],
})
export class CheckStreetsComponent implements OnInit {
  private streets: IStreet[];
  houses: IHouse[];
  public model: IStreet;
  public markers: Marker[] = [];

  constructor(private http: HttpClient) {}

  formatter = (street: IStreet) => street.fullName;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.streets
          .filter((street) => new RegExp(term, 'mi').test(street.fullName))
          .slice(0, 15)
      )
    );

  loadHouses(event: IStreet) {
    if (event) {
      this.http
        .get<IHouse[]>(`api/house?street-id=${event.id}`)
        .subscribe(this.setHouses)
    }
  }

setHouses = (houses) => {
  this.houses = houses;
  this.markers = this.houses.map(
    (h) =>
      new Marker([h.lon, h.lat], {
        icon: new Icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png',
        }),
      })
  );
};

onHouseClick(no: string) {
  console.log(no);
  
}


  ngOnInit(): void {
    this.http
      .get<IStreet[]>('api/street')
      .subscribe((streets) => (this.streets = streets));
  }
}
