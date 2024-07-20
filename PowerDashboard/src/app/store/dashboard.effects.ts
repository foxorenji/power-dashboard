import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {select, Store} from "@ngrx/store";
import {DashboardActions} from "./dashboard.actions";
import {
  catchError,
  map,
  switchMap,
  tap, withLatestFrom,
} from 'rxjs/operators';
import {DataService} from "../services/data.service";
import {of} from "rxjs";
import {Coin, DEFAULT_COIN_PARAMS} from "./dashboard.state";
import {selectPage} from "./dashboard.selectors";

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private store: Store, private dataService: DataService) {}

  public loadDashboardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboardData),
      switchMap(({ params }) =>
        this.dataService.getAll(params).pipe(
          map((data: Coin[]) =>
            DashboardActions.loadDashboardDataSuccess({ data })
          ),
          catchError((error) =>
            of(DashboardActions.loadDashboardDataFailure({ error }))
          )
        )
      )
    )
  );

  public loadDashboardDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.loadDashboardDataFailure),
        tap((httpStatus) => {
          alert(`${httpStatus.error.statusText}. Please note that this endpoint does not support multiple requests in quick succession... 😥`)
        }),
      ),
    { dispatch: false },
  );

  public movePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.showNextPage,
             DashboardActions.showPreviousPage),
      withLatestFrom(this.store.pipe(select(selectPage))),
      tap((r) => console.log(r)),
      switchMap(([_, page]) =>
        this.dataService.getAll({...DEFAULT_COIN_PARAMS, page}).pipe(
          map((data: Coin[]) =>
            DashboardActions.loadDashboardDataSuccess({ data })
          ),
          catchError((error) =>
            of(DashboardActions.loadDashboardDataFailure({ error }))
          )
        )
      )
    )
  );

}
