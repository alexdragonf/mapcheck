import { Feature, GeometryObject } from 'geojson';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { Layer, GeoJSON, GeoJSONOptions, geoJSON } from 'leaflet';
import { TableColumn } from '@swimlane/ngx-datatable';
import { DistrictInterface } from '@mapcheck/api-interfaces';
import { faFileUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface DistrictListInterface extends DistrictInterface {
  visible: boolean;
  layer: Layer;
  index: number;
}

@Component({
  templateUrl: './zoneedit.component.html',
  styleUrls: ['./zoneedit.component.scss'],
})
export class ZoneEditComponent implements OnInit {
  fileUploadIcon = faFileUpload;
  trashAltIcon = faTrashAlt;

  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  // zones: LayerWithData[];
  districts: DistrictListInterface[];
  fileReader: FileReader = new FileReader();

  constructor(private http: HttpClient) {}

  ngOnInit(): void { //TODO: ADD Service 'DistrictService'
    this.http
    .get<DistrictInterface[]>('/api/district?district-type=')
    .subscribe(this.addZones);
  }

  onFileInputChange(e: Event) {
    const file = e.target['files'][0];
    this.fileReader.onload = (e) => {
      const g: GeoJSON.Feature[] = JSON.parse(this.fileReader.result.toString())
        .features;
    const lastIndex = this.districts.length;
      g.forEach((x,i) =>
        {
          const properties = {properties: {
            visible: true,
            index: i
          }};
          const geo = GeoJSON.asFeature(x.geometry);
          this.districts.push(
          <DistrictListInterface>{
          geojson: <Feature>{...geo , ...properties},
          name: x.properties.description,
          visible: true,
          index: lastIndex + i
        })
        console.log(this.districts[lastIndex+i]);
        
        this.newLayer(this.districts[lastIndex+i])}
      );
      this.districts = [...this.districts];
      // this.districts.map(x => this.newLayer(x))
    };
    this.fileReader.readAsText(file);
  }

  loadfile() {
    this.FileSelectInputDialog.nativeElement.click();
  }

  addZones = (value: DistrictListInterface[]) => {
    this.districts = value;
    this.districts.forEach((x,i) => {
      x.visible = Math.random() > 0.5;
      x.index = i;
      const properties = { properties: {
        description: x.name,
        visible: x.visible,
        index: i
      }};
      console.log(i);
      
      x.geojson = { ...x.geojson, ...properties };
    });
    this.districts.map((x) => this.newLayer(x))
  };


  newLayer(x: DistrictListInterface): DistrictListInterface {
    // console.log(x);
    x.layer = new GeoJSON(x.geojson, {
      style: {
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      },
      filter: (geoJsonFeature: Feature<GeometryObject, any>) => {
        console.log(geoJsonFeature.properties);
        return geoJsonFeature.properties['visible']
      }
    });
    x.layer.on('click', (e) => {
      console.log(e);
      return e;
    });
    return x;
  };


  getZones() {
    return this.districts ? this.districts.map((x) => x.layer) : undefined;
  }

  onVisibleChange(i: number) {
    console.log(i);
    console.log(this.districts[i]);
    this.districts[i].visible = !this.districts[i].visible;
    this.districts[i].geojson.properties['visible'] = this.districts[i].visible;
    this.districts[i] = this.newLayer(this.districts[i]);
    console.log(this.districts.map(x=> x.visible));
  }
}
