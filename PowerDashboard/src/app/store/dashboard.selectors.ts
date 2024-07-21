import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DashboardState} from "./dashboard.reducer";
import {EChartsOption} from "echarts";

export const selectFeature = createFeatureSelector<DashboardState>(
  'coins',
);

export const selectDashboardData = createSelector(
  selectFeature,
  (state: DashboardState) => state.data
);

export const selectLoading = createSelector(
  selectFeature,
  (state: DashboardState) => state.loading,
);

export const selectPage = createSelector(
  selectFeature,
  (state: DashboardState) => state.page,
);


export const selectSorting = createSelector(
  selectFeature,
  (state: DashboardState) => state.sortBy,
);

export const selectChartOptions = createSelector(
  selectDashboardData,
  (dashboardData): EChartsOption => {
    if (!dashboardData) {
      return {};
    }

    return {
      title: {
        text: 'Top Cryptocurrency Market Capitalization'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          if (!Array.isArray(params)) {
            return '';
          }

          let tooltipContent = ``;

          params.forEach(param => {
            const data = dashboardData[param.dataIndex];
            if (data) {
              tooltipContent += `
                <div class="p-2">
                  <strong class="text-blue-500">${data.name}</strong><br/>
                  <span class="text-gray-600">Current Price:</span> ${data.current_price}<br/>
                  <span class="text-gray-600">Market Cap:</span> ${data.market_cap}<br/>
                  <span class="text-gray-600">Total Volume:</span> ${data.total_volume}<br/>
                  <span class="text-gray-600">High 24h:</span> ${data.high_24h}<br/>
                  <span class="text-gray-600">Low 24h:</span> ${data.low_24h}<br/>
                  <span class="text-gray-600">Price Change 24h:</span> ${data.price_change_percentage_24h}%<br/>
                  <span class="text-gray-600">Circulating Supply:</span> ${data.circulating_supply}
                </div><br/>
              `;
            }
          });
          return tooltipContent;
        }
      },
      xAxis: {
        type: 'category',
        data: dashboardData.map(coin => coin.symbol.toUpperCase())
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Market Capitalization',
          type: 'bar',
          data: dashboardData.map(coin => coin.market_cap)
        },
      ]
    };
  }
);

