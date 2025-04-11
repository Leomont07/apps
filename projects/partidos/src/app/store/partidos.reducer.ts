// projects/partidos/src/app/partidos/store/partidos.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadPartidosSuccess, addPartido, updatePartido, deletePartido } from './partidos.actions';

export interface PartidosState {
  partidos: any[];
  error: any;
}

export const initialState: PartidosState = {
  partidos: [],
  error: null
};


export const partidosReducer = createReducer(
  initialState,
  on(loadPartidosSuccess, (state, { partidos }) => ({ ...state, partidos })),
  on(addPartido, (state, partido) => ({ ...state, partidos: [...state.partidos, partido] })),
  on(updatePartido, (state, { id, changes }) => ({
    ...state,
    partidos: state.partidos.map((partido) => (partido.id === id ? { ...partido, ...changes } : partido)),
  })),
  on(deletePartido, (state, { id }) => ({ ...state, partidos: state.partidos.filter((partido) => partido.id !== id) }))
);