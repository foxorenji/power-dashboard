import { HttpErrorResponse } from '@angular/common/http';
import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Coin, CoinQueryParams} from "./dashboard.state";

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Dashboard Data': props<{ params: CoinQueryParams }>(),
    'Load Dashboard Data Success': props<{ data: Coin[] }>(),
    'Load Dashboard Data Failure': props<{ error: HttpErrorResponse }>(),
    'Show Next Page': emptyProps(),
    'Show Previous Page': emptyProps()
  },
});
