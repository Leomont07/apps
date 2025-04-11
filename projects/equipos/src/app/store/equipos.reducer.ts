// projects/equipos/src/app/equipos/store/equipos.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadEquipos, loadEquiposSuccess, loadEquiposFailure, addEquipo, deleteEquipo } from './equipos.actions';

export interface EquiposState {
  equipos: any[];
  error: any;
}

export const initialState: EquiposState = {
  equipos: [],
  error: null
};

export const equiposReducer = createReducer(
  initialState,
  on(loadEquipos, (state) => ({ ...state, error: null })),
  on(loadEquiposSuccess, (state, { equipos }) => ({ ...state, equipos, error: null })),
  on(loadEquiposFailure, (state, { error }) => ({ ...state, error })),
  on(addEquipo, (state, { equipo }) => ({ ...state, equipos: [...state.equipos, equipo] })),
  on(deleteEquipo, (state, { id }) => ({
    ...state,
    equipos: state.equipos.filter((equipo) => equipo.id !== id)
  }))
);