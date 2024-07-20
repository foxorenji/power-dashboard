import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Coin, CoinQueryParams} from "../store/dashboard.state";

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

    return this.http.get<Coin[]>(url);
  }
}
