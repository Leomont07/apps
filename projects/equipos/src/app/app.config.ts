// projects/equipos/src/app/app.config.ts
import { ApplicationConfig, APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { equiposReducer } from './store/equipos.reducer';
import { EquiposEffects } from './store/equipos.effects';
import { EquiposService } from './equipos/equipos.service';
import { UpdateNotifierService } from '../../../shared/update-notifier.service';
import { LogService } from '../../../shared/log.service';

const initializeEffectsFactory = () => () => new Promise(resolve => setTimeout(resolve, 0));

const effectsProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeEffectsFactory,
  multi: true
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ equipos: equiposReducer }),
    provideEffects([EquiposEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    effectsProvider,
    provideRouter(routes),
    provideHttpClient(),
    EquiposService,
    UpdateNotifierService,
    LogService
  ]
};