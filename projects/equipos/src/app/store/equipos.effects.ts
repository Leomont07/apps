// projects/equipos/src/app/equipos/store/equipos.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquiposService } from '../equipos/equipos.service';
import { loadEquipos, loadEquiposSuccess, loadEquiposFailure } from './equipos.actions';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class EquiposEffects {
  loadEquipos$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(loadEquipos)).subscribe(() => {
        this.equiposService.getEquipos().subscribe({
          next: (equipos) => {
            observer.next(loadEquiposSuccess({ equipos }));
            observer.complete();
          },
          error: (error) => {
            observer.next(loadEquiposFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(private actions$: Actions, private equiposService: EquiposService) {
    console.log('Actions:', this.actions$);
  }
}