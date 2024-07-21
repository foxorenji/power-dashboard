import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Coin, CoinQueryParams} from "../store/dashboard.state";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAll(params: CoinQueryParams): Observable<Coin[]> {
    const path = `https://api.coingecko.com/api/v3/coins/markets`;
    const queryParams = new URLSearchParams({
      vs_currency: params.vs_currency,
      order: params.order,
      per_page: params.per_page.toString(),
      page: params.page.toString(),
      sparkline: params.sparkline.toString()
    }).toString();
    const url = `${path}?${queryParams}`;

    return this.http.get<Coin[]>(url).pipe(
      map(coins => coins.map((coin: Coin) => ({
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
      })))
    );
  }
}
