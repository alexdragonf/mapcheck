import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
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
} from 'leaflet';
import {LeafletTileLayerDefinition} from '@asymmetrik/ngx-leaflet'
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';


@Component({
  selector: 'mapcheck-map-window',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  markerClusterOptions: MarkerClusterGroupOptions = {
    disableClusteringAtZoom: 7
  }
  mapOptions: MapOptions = {
    layers: [
      new TileLayer(
        'http://vec0{s}.maps.yandex.net/tiles?l=map&z={z}&x={x}&y={y}&scale=2&lang=ru_RU', {
         subdomains: '1234',
         maxZoom: 21,
         attribution: '...',
         minZoom: 8,
       })
     ],
     crs: CRS.EPSG3395
  };
  // 37.801682	47.991914
  @Input() markers: Marker[] = [];
  @Input() centerMap: LatLng = new LatLng(47.994024, 37.801556);
  @Input() zoomMap = 12;
  
  constructor(private ref: ChangeDetectorRef) { }

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.mapOptions.zoom = this.zoomMap;
    this.mapOptions.center = this.centerMap;


    // this.mapOptions = {
    //   layers: [
    //    new TileLayer(this.yandexTileMapBaseURL, {
    //       subdomains: '1234',
    //       maxZoom: 21,
    //       attribution: '...',
    //       minZoom: 8,
    //     })
    //   ],
    //   zoom: this.zoomMap,
    //   center: this.centerMap,
    //   crs: CRS.EPSG3395
    // };

  }

}
