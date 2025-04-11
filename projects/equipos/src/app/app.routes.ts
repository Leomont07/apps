// projects/equipos/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ListaEquiposComponent } from './lista-equipos/lista-equipos.component';

export const routes: Routes = [
  { path: '', component: ListaEquiposComponent },
  { path: '**', redirectTo: '' }
];