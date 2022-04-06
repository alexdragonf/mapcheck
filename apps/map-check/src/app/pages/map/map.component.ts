import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import {
  TileLayer,
  tileLayer,
  LatLng,
  Marker,
  // MarkerClusterGroupOptions,
  Icon,
  LatLngExpression,
  MapOptions,
  MarkerOptions,
  CRS,
  TileLayerOptions,
  Layer,
  MarkerClusterGroupOptions,
  Map,
  LatLngBounds
} from 'leaflet';
import { LeafletTileLayerDefinition } from '@asymmetrik/ngx-leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'mapcheck-map-window',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  markerClusterOptions: MarkerClusterGroupOptions = {
    disableClusteringAtZoom: 7,
  };
  mapOptions: MapOptions = {
    layers: [
      new TileLayer(
        // TODO: ADD CONFIG FOR TILE SERVER
        'http://10.43.0.18/hot/{z}/{x}/{y}.png',
        // 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        // 'http://vec0{s}.maps.yandex.net/tiles?l=map&z={z}&x={x}&y={y}&scale=2&lang=ru_RU',
        {
          // subdomains: '1234',
          maxZoom: 18,
          attribution: '...',
          minZoom: 8,
        }
      ),
    ],
    // crs: CRS.EPSG3395,
  };
  // 37.801682	47.991914
  @Input() layers: Layer[] = [];
  @Input() centerMap: LatLng = new LatLng(47.994024, 37.801556);
  @Input() zoomMap = 12;
  map: Map;
  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.mapOptions.zoom = this.zoomMap;
    this.mapOptions.center = this.centerMap;
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  setBounds(bounds: LatLngBounds) {
    if (this.map) {
      this.map.setMaxBounds(bounds);
    }
  }
}
