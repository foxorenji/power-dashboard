import {createReducer, on} from '@ngrx/store';
import {DashboardActions} from "./dashboard.actions";
import {Coin} from "./dashboard.state";


export interface DashboardState {
  loading: boolean;
  data: Coin[] | null;
  page: number
  sortBy: { field: keyof Coin, direction: 'asc' | 'desc' };
}

/**
 *
 * Helper function that sorts data if they are strings or numbers
 *
 * @param fieldA
 * @param fieldB
 * @param direction
 */
const compareValues = (fieldA: any, fieldB: any, direction: 'asc' | 'desc') => {
  if (typeof fieldA === 'string' && typeof fieldB === 'string') {
    const comparison = fieldA.localeCompare(fieldB);
    return direction === 'asc' ? comparison : -comparison;
  }
  if (typeof fieldA === 'number' && typeof fieldB === 'number') {
    const comparison = fieldA - fieldB;
    return direction === 'asc' ? comparison : -comparison;
  }
  return 0; // Default case if types do not match or are not handled
};

export const initialState: DashboardState = {
  loading: false,
  data: null,
  page: 1,
  sortBy: {field: 'market_cap', direction: 'desc'}
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
    page: state.page + 1,
    sortBy: initialState.sortBy
  })),
  on(DashboardActions.showPreviousPage, (state) => ({
    ...state,
    loading: true,
    page: state.page - 1,
    sortBy: initialState.sortBy
  })),
  on(DashboardActions.resetPage, (state) => ({
    ...state,
    page: 1
  })),
  on(DashboardActions.searchData, (state, { term }) => ({
    ...state,
    data: state.data?.filter(coin => {
      const searchTerm = term.toLowerCase();
      return JSON.stringify(Object.values(coin)).toLowerCase().includes(searchTerm);
    }) ?? [],
  })),

  on(DashboardActions.sortData, (state, {field}) => {
      let sortedData = state.data;

      const newDirection : 'asc' | 'desc' = state.sortBy.field === field && state.sortBy.direction === 'asc' ? 'desc' : 'asc';

      if (sortedData) {
        sortedData = [...sortedData].sort((a, b) => {
          const fieldA = a[field];
          const fieldB = b[field];

          return compareValues(fieldA, fieldB, newDirection);
        });
      }

      return {
        ...state,
        sortBy: {field, direction: newDirection},
        data: sortedData
      };
    }
  ),
);
