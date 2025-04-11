// projects/partidos/src/app/partidos/store/partidos.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PartidosService } from '../partidos/partidos.service';
import { loadPartidos, loadPartidosSuccess, loadPartidosFailure } from './partidos.actions';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class PartidosEffects {
  loadPartidos$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(loadPartidos)).subscribe(() => {
        this.partidosService.getPartidos().subscribe({
          next: (partidos) => {
            observer.next(loadPartidosSuccess({ partidos }));
            observer.complete();
          },
          error: (error) => {
            observer.next(loadPartidosFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(private actions$: Actions, private partidosService: PartidosService) {
    console.log('Actions:', this.actions$);
  }
}