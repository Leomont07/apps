import { createAction, props } from '@ngrx/store';

export const loadStats = createAction('[Stats] Load Stats');
export const loadStatsSuccess = createAction('[Stats] Load Stats Success', props<{ stats: any[] }>());
export const loadStatsFailure = createAction('[Stats] Load Stats Failure', props<{ error: any }>());
export const addStat = createAction('[Stats] Add Stat', props<any>());
export const updateStat = createAction('[Stats] Update Stat', props<{ id: number; changes: any }>());
export const deleteStat = createAction('[Stats] Delete Stat', props<{ id: number }>());