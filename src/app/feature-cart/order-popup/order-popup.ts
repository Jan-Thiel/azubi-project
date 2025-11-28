import { Component, inject, input, output, PLATFORM_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AsyncPipe, isPlatformBrowser } from '@angular/common'
import { selectAddress } from '../../store/selectors/address.selectors'
import { CartsPageActions } from '../../store/actions/carts.actions'

@Component({
  selector: 'app-order-popup',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './order-popup.html',
  styleUrl: './order-popup.css',
})
export class OrderPopup {
  close = output<void>()

  store = inject(Store)
  platformId = inject(PLATFORM_ID)

  date: string = ''

  addresses$ = this.store.select(selectAddress)
  selectedAddress = output<string>()
  selectedBillingAddress = output<string>()
  openPopup = output()

  id = input.required<number>()
  addressId = input.required<number>()
  billingAddressId = input.required<number>()

  order(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(
        CartsPageActions.orderCartItem({
          cart: this.id(),
          date: this.date,
          addressId: this.addressId(),
          billingAddressId: this.billingAddressId(),
        }),
      )
    }
    this.close.emit()
  }

  onClose() {
    // This is called when the popup closes
    this.close.emit()
  }

  onSelect(value: string) {
    this.selectedAddress.emit(value)
  }
  onSelectBilling(value: string) {
    this.selectedBillingAddress.emit(value)
  }

  popupOpen() {
    this.openPopup.emit()
  }
}
