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
import { OrderPopup } from '../order-popup/order-popup'

@Component({
  selector: 'cart',
  imports: [AsyncPipe, CartItemComponent, CartItemForm, OrderComponent, AddressPopup, OrderPopup],
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

  AddressPopupVisible = signal(false)
  OrderPopupVisible = signal<string>('')

  addressId: number = 0
  billingAddressId: number = 0

  onCloseAddressPopup() {
    this.AddressPopupVisible.set(false)
  }

  onOpenAddressPopup() {
    this.AddressPopupVisible.set(true)
  }

  onCloseOrderPopup() {
    this.OrderPopupVisible.set('')
  }

  onOpenOrderPopup(id: number) {
    this.OrderPopupVisible.set(String(id))
  }

  onSelection(value: string) {
    this.addressId = parseInt(value.valueOf())
  }

  onSelectionBilling(value: string) {
    this.billingAddressId = parseInt(value.valueOf())
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(CartsPageActions.loadCartItems())
    }
  }

  protected readonly String = String
}
