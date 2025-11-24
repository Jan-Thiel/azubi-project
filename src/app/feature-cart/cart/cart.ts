import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { CartItem } from '../../model/cartItem.model'
import { selectCartItems } from '../../store/selectors/carts.selectors'
import { CartsPageActions } from '../../store/actions/carts.actions'
import { AsyncPipe, isPlatformBrowser } from '@angular/common'
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
  private readonly platformId
  cartItems$: Observable<readonly CartItem[]> = this.store.select(selectCartItems)
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId
  }

  popupVisible = signal(false)
  addressId: number = 0

  onClosePopup() {
    this.popupVisible.set(false)
  }

  onOpenPopup() {
    this.popupVisible.set(true)
  }

  onSelection(value: string) {
    this.addressId = parseInt(value.valueOf())
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(CartsPageActions.loadCartItems())
    }
  }
}
