import {Component, Input} from '@angular/core';
import {Coin} from "../../store/dashboard.state";
import {select, Store} from "@ngrx/store";
import {selectLoading, selectPage, selectSorting} from "../../store/dashboard.selectors";
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

  public sortBy$ = this.store.pipe(select(selectSorting));

  public columnDefs: { headerText: string, id: keyof Coin }[] = [
    { headerText: 'ID', id: 'id' },
    { headerText: 'Symbol', id: 'symbol' },
    { headerText: 'Name', id: 'name' },
    { headerText: 'Current Price', id: 'current_price' },
    { headerText: 'Market Cap', id: 'market_cap' },
    { headerText: 'Total Volume', id: 'total_volume' },
    { headerText: 'High (24h)', id: 'high_24h' },
    { headerText: 'Low (24h)', id: 'low_24h' },
    { headerText: 'Price Change (24h)', id: 'price_change_percentage_24h' },
    { headerText: 'Circulating Supply', id: 'circulating_supply' },
  ];

  constructor(private store: Store){}

  nextPage() {
    this.store.dispatch(DashboardActions.showNextPage())
  }

  previousPage() {
    this.store.dispatch(DashboardActions.showPreviousPage())

  }

  sort(field: keyof Coin) {
    this.store.dispatch(DashboardActions.sortData({ field }))
  }
}
