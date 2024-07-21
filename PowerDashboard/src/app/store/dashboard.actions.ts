import {HttpErrorResponse} from '@angular/common/http';
import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Coin} from "./dashboard.state";

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Dashboard Data': emptyProps(),
    'Load Dashboard Data Success': props<{ data: Coin[] }>(),
    'Load Dashboard Data Failure': props<{ error: HttpErrorResponse }>(),
    'Show Next Page': emptyProps(),
    'Show Previous Page': emptyProps(),
    'Reset Page': emptyProps(),
    'Search Data': props<{term: string}>(),
    'Sort Data': props<{field: keyof Coin}>(),
  },
});
