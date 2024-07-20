import { createFeatureSelector, createSelector } from '@ngrx/store';
import {Coin} from "./dashboard.state";
import {DashboardState} from "./dashboard.reducer";

export const selectFeature = createFeatureSelector<DashboardState>(
  'coins',
);

export const selectDashboardData = createSelector(
  selectFeature,
  (state: DashboardState) => {
    return state.data?.map((coin: Coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      circulating_supply: coin.circulating_supply
    }));
  }
);

export const selectLoading = createSelector(
  selectFeature,
  (state: DashboardState) => state.loading,
);

export const selectPage = createSelector(
  selectFeature,
  (state: DashboardState) => state.page,
);
