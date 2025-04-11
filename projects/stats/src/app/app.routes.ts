import { Routes } from '@angular/router';
import { ListaStatsComponent } from './lista-stats/lista-stats.component';

export const routes: Routes = [
  { path: '', component: ListaStatsComponent },
  { path: '**', redirectTo: '' }
];