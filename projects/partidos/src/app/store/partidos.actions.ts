import { createAction, props } from '@ngrx/store';

export const loadPartidos = createAction('[Partidos] Load Partidos');
export const loadPartidosSuccess = createAction('[Partidos] Load Partidos Success', props<{ partidos: any[] }>());
export const loadPartidosFailure = createAction('[Partidos] Load Partidos Failure', props<{ error: any }>());
export const addPartido = createAction('[Partidos] Add Partido', props<any>());
export const updatePartido = createAction('[Partidos] Update Partido', props<{ id: number; changes: any }>());
export const deletePartido = createAction('[Partidos] Delete Partido', props<{ id: number }>());