import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable, PLATFORM_ID } from '@angular/core'
import { CartItem } from '../model/cartItem.model'
import { SsrCookieService } from 'ngx-cookie-service-ssr'
import { isPlatformBrowser } from '@angular/common'
import { Address } from '../model/address.model'
import { CustomerService } from './customer.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient) {}

  createCartItem(vehicleId: number, time: number, price: number, quantity: number) {
    return this.http.post(
      'http://localhost:8080/api/cartItems',
      {
        vehicleId: vehicleId,
        time: time,
        userId: 0,
        price: price,
        quantity: quantity,
      },
      {
        withCredentials: true,
      },
    )
  }

  fetchCartItems(): Observable<readonly CartItem[]> {
    return this.http.get<CartItem[]>('http://localhost:8080/api/cartItems', {
      withCredentials: true,
    })
  }

  changeCartItemQuantity(id: number, quant: number) {
    return this.http.post<ReadonlyArray<CartItem>>(
      'http://localhost:8080/api/cartItems/changeQuantity',
      { id: id, quantity: quant },
      { withCredentials: true },
    )
  }

  changeCartItemTime(id: number, time: number) {
    return this.http.post<ReadonlyArray<CartItem>>(
      'http://localhost:8080/api/cartItems/changeTime',
      { id: id, time: time },
      { withCredentials: true },
    )
  }

  orderCartItem(cart: number, addressId: number, billingAddressId: number, date: string) {
    return this.http.post<ReadonlyArray<CartItem>>(
      'http://localhost:8080/api/orders/order',
      {
        id: cart,
        addressId: addressId,
        billingAddressId: billingAddressId,
        date: date,
      },
      { withCredentials: true },
    )
  }

  removeCartItem(id: number) {
    return this.http.post(
      'http://localhost:8080/api/cartItems/removeItem',
      { id: id },
      { withCredentials: true },
    )
  }
}
