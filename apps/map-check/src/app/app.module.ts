import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CheckStreetsComponent, MainMenuComponent } from './pages';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [AppComponent, CheckStreetsComponent, MainMenuComponent, MapComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    LeafletModule,
    LeafletMarkerClusterModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
