// projects/equipos/src/app/equipos/equipos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEquiposComponent } from '../lista-equipos/lista-equipos.component';

const routes: Routes = [
  { path: '', component: ListaEquiposComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {}