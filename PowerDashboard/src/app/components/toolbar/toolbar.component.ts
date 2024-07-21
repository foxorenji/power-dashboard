import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {DashboardActions} from "../../store/dashboard.actions";
import {DEFAULT_COIN_PARAMS} from "../../store/dashboard.state";
import {selectLoading} from "../../store/dashboard.selectors";

@Component({
  selector: 'power-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  public loading$ = this.store.pipe(select(selectLoading));


  constructor(private store: Store){
  }

  fetchData() {
    this.store.dispatch(DashboardActions.resetPage());
    this.store.dispatch(DashboardActions.loadDashboardData());
  }
}
