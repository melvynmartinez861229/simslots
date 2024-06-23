import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { GameslotsComponent } from './views/gameslots/gameslots.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'gameslots', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'gameslots', component: GameslotsComponent
  }
];
