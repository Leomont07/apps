import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosRoutingModule } from './partidos-routing.module';
import { ListaPartidosComponent } from '../lista-partidos/lista-partidos.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { partidosReducer } from '../store/partidos.reducer';
import { PartidosEffects } from '../store/partidos.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListaPartidosComponent],
  imports: [
    CommonModule,
    PartidosRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ partidos: partidosReducer }),
    EffectsModule.forRoot([PartidosEffects]),
  ],
})
export class PartidosModule {}