// projects/ejugadoress/src/app/app.config.ts
import { ApplicationConfig, APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { jugadoresReducer } from './store/jugadores.reducer';
import { JugadoresEffects } from './store/jugadores.effects';
import { JugadoresService } from './jugadores/jugadores.service';
import { UpdateNotifierService } from '../../../shared/update-notifier.service';
import { LogService } from '../../../shared/log.service';

// Retrasar la inicialización de los efectos hasta que el store esté listo
const initializeEffectsFactory = () => () => new Promise(resolve => setTimeout(resolve, 0));

const effectsProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeEffectsFactory,
  multi: true
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ jugadores: jugadoresReducer }),
    provideEffects([JugadoresEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    effectsProvider,
    provideRouter(routes),
    provideHttpClient(),
    JugadoresService,
    UpdateNotifierService,
    LogService
  ]
};