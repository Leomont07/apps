import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaStatsComponent } from '../lista-stats/lista-stats.component';

const routes: Routes = [
  { path: '', component: ListaStatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}