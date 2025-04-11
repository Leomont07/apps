// projects/jugadores/src/app/jugadores/store/jugadores.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JugadoresService } from '../jugadores/jugadores.service';
import { loadJugadores, loadJugadoresSuccess, loadJugadoresFailure } from './jugadores.actions';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class JugadoresEffects {
  loadJugadores$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(loadJugadores)).subscribe(() => {
        this.jugadoresService.getJugadores().subscribe({
          next: (jugadores) => {
            observer.next(loadJugadoresSuccess({ jugadores }));
            observer.complete();
          },
          error: (error) => {
            observer.next(loadJugadoresFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(private actions$: Actions, private jugadoresService: JugadoresService) {}
}