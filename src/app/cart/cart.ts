import { Component, inject, signal } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { CartItem } from '../model/cartItem.model'
import { selectCartItems } from '../store/selectors/carts.selectors'
import { CartsPageActions } from '../store/actions/carts.actions'
import { AsyncPipe } from '@angular/common'
import { CartItemComponent } from '../cart-item/cart-item'
import { CartItemForm } from '../cart-item-form/cart-item-form'
import { OrderComponent } from '../order/order.component'
import { AddressPopup } from '../address-popup/address-popup'

@Component({
  selector: 'cart',
  imports: [AsyncPipe, CartItemComponent, CartItemForm, OrderComponent, AddressPopup],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private store = inject(Store)
  cartItems$: Observable<readonly CartItem[]> = this.store.select(selectCartItems)

  popupVisible = signal(false)
  addressId: number = 0

  onClosePopup() {
    this.popupVisible.set(false)
    console.log('Popup closed')
  }

  onOpenPopup() {
    this.popupVisible.set(true)
  }

  onSelection(value: string) {
    this.addressId = parseInt(value.valueOf())
  }

  ngOnInit(): void {
    this.store.dispatch(CartsPageActions.loadCartItems())
  }
}
