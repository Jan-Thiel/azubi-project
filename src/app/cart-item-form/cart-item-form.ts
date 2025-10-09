import { Component, inject, input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { CartsPageActions } from '../store/actions/carts.actions'

@Component({
  selector: 'app-cart-item-form',
  imports: [FormsModule],
  templateUrl: './cart-item-form.html',
  styleUrl: './cart-item-form.css',
})
export class CartItemForm {
  readonly cartItemId = input.required<number>()
  time = 1
  quantity = 1
  private store = inject(Store)


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
    console.log("Quant Changed")
  }
}
