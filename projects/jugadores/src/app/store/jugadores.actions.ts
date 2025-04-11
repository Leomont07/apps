import { createAction, props } from '@ngrx/store';

export const loadJugadores = createAction('[Jugadores] Load Jugadores');
export const loadJugadoresSuccess = createAction('[Jugadores] Load Jugadores Success', props<{ jugadores: any[] }>());
export const addJugador = createAction('[Jugadores] Add Jugador', props<any>());
export const updateJugador = createAction('[Jugadores] Update Jugador', props<{ id: number; changes: any }>());
export const deleteJugador = createAction('[Jugadores] Delete Jugador', props<{ id: number }>());
export const loadJugadoresFailure = createAction('[Jugadores] Load Jugadores Failure', props<{ error: any }>());