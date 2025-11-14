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

  createCartItem(vehicleId: number, time: number, userId: number, price: number, quantity: number) {
    this.http
      .post('http://localhost:8080/api/cartItems', {
        vehicleId: vehicleId,
        time: time,
        userId: userId,
        price: price,
        quantity: quantity,
      })
      .subscribe()
    console.log('posted!')
  }

  fetchCartItems(): Observable<readonly CartItem[]> {
    console.log('Fetch cart Items')
    return this.http.get<CartItem[]>('http://localhost:8080/api/cartItems', {
      params: new HttpParams().append('userId', 'userIdInsertPlaceholder'),
    })
  }

  changeCartItemQuantity(id: number, quant: number) {
    return this.http.post<ReadonlyArray<CartItem>>(
      'http://localhost:8080/api/cartItems/changeQuantity',
      { id: id, quantity: quant },
    )
  }

  changeCartItemTime(id: number, time: number) {
    return this.http.post<ReadonlyArray<CartItem>>(
      'http://localhost:8080/api/cartItems/changeTime',
      { id: id, time: time },
    )
  }

  orderCartItem(cart: number, addressId: number, billingAddressId: number, date: string) {
    return this.http.post<ReadonlyArray<CartItem>>('http://localhost:8080/api/orders/order', {
      id: cart,
      addressId: addressId,
      billingAddressId: billingAddressId,
      date: date,
    })
  }

  removeCartItem(id: number) {
    return this.http.post('http://localhost:8080/api/cartItems/removeItem', { id: id })
  }
}
