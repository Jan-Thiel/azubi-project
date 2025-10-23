import { Component, inject, input, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { CartsPageActions } from '../store/actions/carts.actions'
import { selectAddress } from '../store/selectors/address.selectors'
import { AddressPageActions } from '../store/actions/address.actions'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-cart-item-form',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './cart-item-form.html',
  styleUrl: './cart-item-form.css',
})
export class CartItemForm {
  readonly cartItemId = input.required<number>()
  time = 1
  quantity = 1
  private store = inject(Store)
  addresses$ = this.store.select(selectAddress)
  openPopup = output<void>()

  selectedAddress = output<string>()

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
    console.log('Quant Changed')
  }

  popupOpen() {
    this.openPopup.emit()
  }

  onSelect(value: string) {
    console.log('Address Value Changed: ', value)
    this.selectedAddress.emit(value)
  }

  ngOnInit() {
    this.store.dispatch(AddressPageActions.loadAddresses())
  }
}
