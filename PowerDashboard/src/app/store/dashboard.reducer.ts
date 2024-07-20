import { createReducer, on } from '@ngrx/store';
import {DashboardActions} from "./dashboard.actions";
import {Coin} from "./dashboard.state";


export interface DashboardState {
  loading: boolean;
  data: Coin[] | null;
  page: number
}

export const initialState: DashboardState = {
  loading: false,
  data: null,
  page: 1
};

export const dataReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboardData, (state) => ({
    ...state,
    loading: true,
  })),
  on(DashboardActions.loadDashboardDataSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(DashboardActions.loadDashboardDataFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(DashboardActions.showNextPage, (state) => ({
    ...state,
    loading: true,
    page: state.page + 1
  })),
  on(DashboardActions.showPreviousPage, (state) => ({
    ...state,
    loading: true,
    page: state.page - 1
  })),
  on(DashboardActions.resetPage, (state) => ({
    ...state,
    page: 1
  })),
);
