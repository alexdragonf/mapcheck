import { DistrictService } from './../../services/district.service';
import { Feature, GeometryObject } from 'geojson';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  inject,
  Inject,
  HostListener,
} from '@angular/core';
import { Layer, GeoJSON, GeoJSONOptions, geoJSON } from 'leaflet';
import { TableColumn } from '@swimlane/ngx-datatable';
import { DistrictInterface } from '@mapcheck/api-interfaces';
import {
  faFileUpload,
  faTrashAlt,
  faPaste,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

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
  pasteIcon = faPaste;
  saveIcon = faSave;

  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  districts: DistrictListInterface[];
  fileReader: FileReader = new FileReader();

  constructor(
    private http: HttpClient,
    @Inject('Window') private window: Window,
    private districtService: DistrictService
  ) {}

<<<<<<< HEAD
  ngOnInit(): void { //TODO: ADD Service 'DistrictService'
    this.http
    .get<DistrictInterface[]>('/api/district?district-type=')
    .subscribe(this.addZones);
=======
  ngOnInit(): void {
    //TODO: ADD Service 'DistrictService'
    // this.http
    // .get<DistrictInterface[]>('/api/district?district-type=2')
    this.districtService.getDistrictsByType(2).subscribe(this.addZones);
>>>>>>> 46ab34a6c6f6302e75fdacbde3e5aab6ee3e20f8
  }

  onFileInputChange(e: Event) {
    const file = e.target['files'][0];
    this.fileReader.onload = (e) => {
      const g: GeoJSON.Feature[] = JSON.parse(this.fileReader.result.toString())
        .features;
      const lastIndex = this.districts ? this.districts.length : 0;
      g.forEach((x, i) => {
        const properties = {
          properties: {
            visible: true,
            index: i,
            ...x.properties
          },
        };
        // const properties = {
        //   properties: x.properties
        // }
        console.log(properties);
        
        const geo = GeoJSON.asFeature(x.geometry);
        this.districts.push(<DistrictListInterface>{
          geojson: <Feature>{ ...geo, ...properties },
          name: x.properties.description,
          visible: true,
          index: lastIndex + i,
        });
        console.log(this.districts[lastIndex + i]);

        this.newLayer(this.districts[lastIndex + i]);
      });
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
    this.districts.forEach((x, i) => {
      // x.visible = Math.random() > 0.5;
      x.visible = true;
      x.index = i;
      const properties = {
        properties: {
          description: x.name,
          visible: x.visible,
          index: i,
          ...x.geojson.properties
        },
      };
      console.log(i);

      x.geojson = { ...x.geojson, ...properties };
    });
    this.districts.map((x) => this.newLayer(x));
  };

  newLayer(x: DistrictListInterface): DistrictListInterface {
    // console.log(x.geojson.properties['fill']);
    x.layer = new GeoJSON(x.geojson, {
      style: {
        // color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        fillColor: x.geojson.properties['fill'],
        fillOpacity: x.geojson.properties['fill-opacity'],
        color: x.geojson.properties['stroke'],
        opacity: x.geojson.properties['stroke-opacity'],
        weight: 2,

      },
      filter: (geoJsonFeature: Feature<GeometryObject, any>) => {
        // console.log(geoJsonFeature.properties);
        return geoJsonFeature.properties['visible'];
      },
    });
    x.layer.on('click', (e) => {
      console.log(e);
      return e;
    });
    return x;
  }

  onSave() {
    this.districtService.postDistrict(
      this.districts
      .filter((x) => x.visible)
        .map((y) => (<DistrictInterface>{
          id: y.id,
          name: y.name,
          geojson: y.geojson,
          // parentId: undefined,
          districtType: 2,
          polygon: y.polygon,
          // comment: undefined
        }))
    ).subscribe({
      error: x =>console.log(x),
      complete: () => this.ngOnInit()
      
    })

  }

  onDelete() {
    this.districtService.deleteDistrict(
      this.districts.filter((x) => x.visible).map((x) => x.id)
    ).subscribe({
      error: x =>console.log(x),
      complete: () => this.ngOnInit()
      
    })
  }

  getZones() {
    return this.districts ? this.districts.map((x) => x.layer) : undefined;
  }

  onVisibleChange(i: number) {
    console.log(i);
    console.log(this.districts[i]);
    this.districts[i].visible = !this.districts[i].visible;
    this.districts[i].geojson.properties['visible'] = this.districts[i].visible;
    this.districts[i] = this.newLayer(this.districts[i]);
    console.log(this.districts.map((x) => x.visible));
  }

  async onPaste() {
    const a = await this.window.navigator.clipboard.readText();
    // a.forEach(x => console.log(x))
    console.log(a);
    try {
      const geo: GeoJSON.Feature = JSON.parse(
        await this.window.navigator.clipboard.readText()
      );
      console.log(geo);
      const districtlastIndex = this.districts.length;
      const properties = {
        properties: {
          description: 'x.name',
          visible: true,
          index: districtlastIndex,
        },
      };
      this.districts.push(<DistrictListInterface>{
        name: 'From clipboard',
        geojson: <GeoJSON.Feature>{ ...geo, ...properties },
        visible: true,
        index: districtlastIndex,
      });
      this.newLayer(this.districts[districtlastIndex]);
      this.districts = [...this.districts];
    } catch (error) {
      console.error(error);
    }
  }
}
