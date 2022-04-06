import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConfigModule, ConfigService } from 'ng-config-module';
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
import { AppConfig} from './app.config'

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
<<<<<<< Updated upstream
    { provide: 'Window', useValue: window }
=======
    { provide: 'Window', useValue: window },
    { provide: AppConfig, useExisting: ConfigService
    }
>>>>>>> Stashed changes
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
