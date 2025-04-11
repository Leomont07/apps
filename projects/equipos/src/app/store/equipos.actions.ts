import { createAction, props } from '@ngrx/store';

export const loadEquipos = createAction('[Equipos] Load Equipos');
export const loadEquiposSuccess = createAction('[Equipos] Load Equipos Success', props<{ equipos: any[] }>());
export const loadEquiposFailure = createAction('[Equipos] Load Equipos Failure', props<{ error: any }>());
export const addEquipo = createAction('[Equipos] Add Equipo', props<any>());
export const updateEquipo = createAction('[Equipos] Update Equipo', props<{ id: number; changes: any }>());
export const deleteEquipo = createAction('[Equipos] Delete Equipo', props<{ id: number }>());