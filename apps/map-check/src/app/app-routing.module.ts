import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckStreetsComponent, MainMenuComponent, MapComponent } from './pages';

const routes: Routes = [
  { path: '#', children:[], canDeactivate: [false] },
  { path: 'main-menu', component: MainMenuComponent },
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
  { path: 'check-street', component: CheckStreetsComponent },
  { path: 'map', component: MapComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
