import { Component, inject, input, PLATFORM_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { CartsPageActions } from '../../store/actions/carts.actions'
import { Store } from '@ngrx/store'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-order',
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  router = inject(Router)
  store = inject(Store)
  platformId = inject(PLATFORM_ID)
  id = input.required<number>()
  addressId = input.required<number>()
  billingAddressId = input.required<number>()
  date: string = ''
  name: string = ''

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

    // Order confirmation is displayed upon successful order
    this.router.navigate(['/orderConf', this.id()]).then()
  }
}
