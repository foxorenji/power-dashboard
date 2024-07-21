
export const DEFAULT_COIN_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_descending',
  per_page: 250,
  page: 1,
  sparkline: false
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price: number;
  market_cap: number;
  market_cap_rank?: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h?: number;
  price_change_percentage_24h: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  ath_date?: string;
  atl?: number;
  atl_change_percentage?: number;
  atl_date?: string;
  roi?: number | null;
  last_updated?: string;
}

export interface CoinQueryParams {
  vs_currency: string;
  order: string;
  per_page: number;
  page: number;
  sparkline: boolean;
}
