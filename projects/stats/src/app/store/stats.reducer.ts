import { createReducer, on } from '@ngrx/store';
import { loadStatsSuccess, addStat, updateStat, deleteStat } from './stats.actions';

export interface StatsState {
  stats: any[];
  error: any
}

export const initialState: StatsState = {
  stats: [],
  error: null
};

export const statsReducer = createReducer(
  initialState,
  on(loadStatsSuccess, (state, { stats }) => ({ ...state, stats })),
  on(addStat, (state, stat) => ({ ...state, stats: [...state.stats, stat] })),
  on(updateStat, (state, { id, changes }) => ({
    ...state,
    stats: state.stats.map((stat) => (stat.id === id ? { ...stat, ...changes } : stat)),
  })),
  on(deleteStat, (state, { id }) => ({ ...state, stats: state.stats.filter((stat) => stat.id !== id) }))
);