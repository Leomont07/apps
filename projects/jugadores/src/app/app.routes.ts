// projects/jugadores/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';

export const routes: Routes = [
  { path: '', component: ListaJugadoresComponent },
  { path: '**', redirectTo: '' }
];