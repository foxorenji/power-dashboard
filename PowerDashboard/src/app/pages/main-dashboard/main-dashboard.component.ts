import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {selectDashboardData} from "../../store/dashboard.selectors";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {

  protected searchControl = new FormControl<string>('');

  public displayedData$ = this.store.pipe(select(selectDashboardData));

  constructor(private store: Store) {
    // const params: CoinQueryParams = DEFAULT_COIN_PARAMS;
    // this.store.dispatch(DashboardActions.loadDashboardData({ params }))
  }
}
