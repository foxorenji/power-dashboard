import {Component, Input} from '@angular/core';
import {Coin} from "../../store/dashboard.state";
import {select, Store} from "@ngrx/store";
import {selectLoading, selectPage} from "../../store/dashboard.selectors";
import {DashboardActions} from "../../store/dashboard.actions";

@Component({
  selector: 'power-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() data: Partial<Coin[]> = [];

  @Input() showPagination = true;

  public currentPage$ = this.store.pipe(select(selectPage));

  public loading$ = this.store.pipe(select(selectLoading));

  constructor(private store: Store){}

  nextPage() {
    this.store.dispatch(DashboardActions.showNextPage())
  }

  previousPage() {
    this.store.dispatch(DashboardActions.showPreviousPage())

  }
}
