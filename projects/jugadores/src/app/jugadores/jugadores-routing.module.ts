// projects/jugadores/src/app/jugadores/jugadores-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaJugadoresComponent } from '../lista-jugadores/lista-jugadores.component';

const routes: Routes = [
  { path: '', component: ListaJugadoresComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresRoutingModule {}