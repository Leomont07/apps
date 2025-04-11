import { createReducer, on } from '@ngrx/store';
import { loadJugadoresSuccess, addJugador, updateJugador, deleteJugador, loadJugadoresFailure } from './jugadores.actions';

export interface EstadoJugador {
  jugadores: any[];
}

const initialState: EstadoJugador = { jugadores: [] };

export const jugadoresReducer = createReducer(
  initialState,
  on(loadJugadoresSuccess, (state, { jugadores }) => ({ ...state, jugadores })),
  on(loadJugadoresFailure, (state, { error }) => ({ ...state, error })),
  on(addJugador, (state, jugador) => ({ ...state, jugadores: [...state.jugadores, jugador] })),
  on(updateJugador, (state, { id, changes }) => ({
    ...state,
    jugadores: state.jugadores.map((jugador) => (jugador.id === id ? { ...jugador, ...changes } : jugador)),
  })),
  on(deleteJugador, (state, { id }) => ({ ...state, jugadores: state.jugadores.filter((jugador) => jugador.id !== id) }))
);