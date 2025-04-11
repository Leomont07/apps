// projects/equipos/src/app/equipos/store/test.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class TestEffects {
  testEffect$ = createEffect(() => {
    console.log('Actions in TestEffects:', this.actions$);
    return this.actions$.pipe(
      ofType('[Test] Test Action'),
      map(() => ({ type: '[Test] Test Action Success' }))
    );
  });

  constructor(private actions$: Actions) {
    console.log('Actions in TestEffects constructor:', this.actions$);
  }
}