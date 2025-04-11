import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadoresRoutingModule } from './jugadores-routing.module';
import { ListaJugadoresComponent } from '../lista-jugadores/lista-jugadores.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { jugadoresReducer } from '../store/jugadores.reducer';
import { JugadoresEffects } from '../store/jugadores.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListaJugadoresComponent],
  imports: [
    CommonModule,
    JugadoresRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ jugadores: jugadoresReducer }),
    EffectsModule.forRoot([JugadoresEffects]),
  ],
})
export class JugadoresModule {}