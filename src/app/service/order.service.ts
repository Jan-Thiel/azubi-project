import { inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Order } from '../model/order.model'
import { CookieService } from './cookie.service'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  cookieService = inject(CookieService)

  constructor(private http: HttpClient) {}

  fetchOrdersApi() {
    console.log('fetchOrderApi fired!')
    return this.http.get<Order[]>('http://localhost:8080/api/orders', {
      params: new HttpParams().append('userId', this.cookieService.getCookie('userId', document)),
    })
  }
}
