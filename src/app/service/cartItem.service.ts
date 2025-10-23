import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { CartItem } from '../model/cartItem.model'
import { CookieService } from './cookie.service'

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  cookieService = inject(CookieService)

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

  fetchCartItems(document: Document) {
    return this.http.get<CartItem[]>('http://localhost:8080/api/cartItems', {
      params: new HttpParams().append('userId', this.cookieService.getCookie('userId', document)),
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
}
