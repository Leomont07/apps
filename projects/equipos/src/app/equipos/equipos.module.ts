import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposRoutingModule } from './equipos-routing.module';
import { ListaEquiposComponent } from '../lista-equipos/lista-equipos.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { equiposReducer } from '../store/equipos.reducer';
import { EquiposEffects } from '../store/equipos.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListaEquiposComponent],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ teams: equiposReducer }),
    EffectsModule.forRoot([EquiposEffects]),
  ],
})
export class TeamsModule {}