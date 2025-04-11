import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRoutingModule } from './stats-routing.module';
import { ListaStatsComponent } from '../lista-stats/lista-stats.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { statsReducer } from '../store/stats.reducer';
import { StatsEffects } from '../store/stats.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListaStatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ stats: statsReducer }),
    EffectsModule.forRoot([StatsEffects]),
  ],
})
export class StatsModule {}