import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {DashboardActions} from "./dashboard.actions";
import {
  catchError,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {DataService} from "../services/data.service";
import {of} from "rxjs";
import {Coin} from "./dashboard.state";

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
    // show error
        }),
      ),
    { dispatch: false },
  );


}
