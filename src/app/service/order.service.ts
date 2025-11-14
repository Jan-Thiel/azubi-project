import { inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Order } from '../model/order.model'
import { SsrCookieService } from 'ngx-cookie-service-ssr'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  cookieService = inject(SsrCookieService)

  constructor(private http: HttpClient) {}

  fetchOrdersApi() {
    return this.http.get<Order[]>('http://localhost:8080/api/orders', {
      params: new HttpParams().append('userId', 'userIdInsertPlaceholder'),
    })
  }
}
