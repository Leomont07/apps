// projects/stats/src/app/stats/store/stats.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatsService } from '../stats/stats.service';
import { loadStats, loadStatsSuccess, loadStatsFailure } from './stats.actions';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class StatsEffects {
  loadStats$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(loadStats)).subscribe(() => {
        this.statsService.getStats().subscribe({
          next: (stats) => {
            observer.next(loadStatsSuccess({ stats }));
            observer.complete();
          },
          error: (error) => {
            observer.next(loadStatsFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(private actions$: Actions, private statsService: StatsService) {
    console.log('Actions:', this.actions$);
  }
}