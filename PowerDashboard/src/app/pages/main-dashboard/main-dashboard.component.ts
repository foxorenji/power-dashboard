import {Component, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {selectDashboardData} from "../../store/dashboard.selectors";
import {debounceTime, filter, iif, of, startWith, Subject} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {DashboardActions} from "../../store/dashboard.actions";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnDestroy{

  protected searchControl = new FormControl<string>('', { nonNullable: true });

  public displayedData$ = this.store.pipe(select(selectDashboardData));

  private destroyed$ = new Subject<void>();

  constructor(private store: Store) {

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      switchMap(term => iif(
        () => term.length > 0,
        of(term).pipe(tap(() => this.store.dispatch(DashboardActions.searchData({ term })))),
        of(term).pipe(tap(() => this.store.dispatch(DashboardActions.loadDashboardData())))
      ))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
