import { MapComponent } from './../map/map.component';
import { StreetInterface, HouseInterface } from '@mapcheck/api-interfaces';
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
import { Marker, Icon , LatLng, latLngBounds, Map, LatLngBounds, bounds} from 'leaflet';

@Component({
  selector: 'mapcheck-street',
  templateUrl: './check-streets.component.html',
  styleUrls: ['./check-streets.component.scss'],
})
export class CheckStreetsComponent implements OnInit, AfterViewInit {
  private streets: StreetInterface[];
  houses: HouseInterface[];
  public model: StreetInterface;
  public markers: Marker[] = [];
  public centerMap: LatLng = new LatLng(47.994024, 37.801556);
  public zoomMap = 12;
  @ViewChild('map') map: MapComponent;

  constructor(private http: HttpClient) {}

  formatter = (street: StreetInterface) => street.fullName;

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

  loadHouses(event: StreetInterface) {
    if (event) {
      this.http
        .get<HouseInterface[]>(`api/house?street-id=${event.id}`)
        .subscribe(this.setHouses)
    }
  };

setHouses = (houses) => {
  // let _bounds: LatLngBounds; //TODO: Установить границы карты
  this.houses = houses;
  if (houses) {
    // _bounds = new LatLngBounds([[houses[0].lon, houses[0].lat], [houses[0].lon, houses[0].lat]])
  // _bounds = new LatLngBounds([[47, 37],[47, 37]])
  }
  this.markers = this.houses.map(
    (h) =>
      {
        const _m= new Marker([h.lon, h.lat], {
        icon: new Icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        }),
      })
      // _bounds.extend([h.lon, h.lat])
      _m.bindPopup(`${this.model.fullName}, д. ${h.house}`);
      return _m
    }
    );
    // this.map.setBounds(_bounds)
};

onHouseClick(i: number) {
  // console.log(no);
  this.centerMap = new LatLng(this.houses[i].lon, this.houses[i].lat);
  this.zoomMap = 18;
  this.markers[i].openPopup();
}


  ngOnInit(): void {
    this.http
      .get<StreetInterface[]>('api/street')
      .subscribe((streets) => (this.streets = streets));
  }

  ngAfterViewInit() {
    console.log(this.map);
    
  }

}
