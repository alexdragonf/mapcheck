import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {
  CheckStreetsComponent,
  MainMenuComponent,
  ZoneEditComponent,
  MapComponent
} from './pages';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    CheckStreetsComponent,
    MainMenuComponent,
    MapComponent,
    ZoneEditComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    LeafletModule,
    LeafletMarkerClusterModule.forRoot(),
    NgxDatatableModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
