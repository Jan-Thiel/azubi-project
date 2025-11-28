import { Component, inject, input, OnInit, output, PLATFORM_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { CartsPageActions } from '../../store/actions/carts.actions'
import { AddressPageActions } from '../../store/actions/address.actions'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-cart-item-form',
  imports: [FormsModule],
  templateUrl: './cart-item-form.html',
  styleUrl: './cart-item-form.css',
})
export class CartItemForm implements OnInit {
  readonly cartItemId = input.required<number>()
  time = 1
  quantity = 1
  private store = inject(Store)
  platformId = inject(PLATFORM_ID)
  openPopup = output()

  timeChange() {
    this.store.dispatch(
      CartsPageActions.changeCartItemTime({ cartItem: this.cartItemId(), time: this.time }),
    )
  }

  quantChange() {
    this.store.dispatch(
      CartsPageActions.changeCartItemQuantity({
        cartItem: this.cartItemId(),
        quant: this.quantity,
      }),
    )
  }

  popupOpen() {
    this.openPopup.emit()
  }

  onDelete() {
    this.store.dispatch(CartsPageActions.deleteCartItem({ id: this.cartItemId() }))
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AddressPageActions.loadAddresses())
    }
  }
}
