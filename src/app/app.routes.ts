import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StocksComponent } from './stocks/stocks.component';
import { SectorsComponent } from './sectors/sectors.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'sectors', component: SectorsComponent }
];