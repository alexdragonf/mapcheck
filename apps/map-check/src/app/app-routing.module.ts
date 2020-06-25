import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckStreetsComponent, MainMenuComponent, MapComponent,ZoneEditComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'check-street', component: CheckStreetsComponent },
  { path: 'zone-edit', component: ZoneEditComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
