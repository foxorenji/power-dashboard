import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectChartOptions, selectLoading} from "../../store/dashboard.selectors";
import {EChartsOption} from "echarts";
import {Subject} from "rxjs";

@Component({
  selector: 'power-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent{
  public loading$ = this.store.pipe(select(selectLoading));

  public chartOptions$ = this.store.pipe(select(selectChartOptions));

  constructor(private store: Store) {
  }


}
