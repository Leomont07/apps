import { Routes } from '@angular/router';
import { ListaPartidosComponent } from './lista-partidos/lista-partidos.component';

export const routes: Routes = [
  { path: '', component: ListaPartidosComponent },
  { path: '**', redirectTo: '' }
];