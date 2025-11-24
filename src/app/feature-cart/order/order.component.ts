import { Component, inject, input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { CartsPageActions } from '../../store/actions/carts.actions'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-order',
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  router = inject(Router)
  store = inject(Store)
  id = input.required<number>()
  addressId = input.required<number>()
  date: string = ''
  name: string = ''

  order(): void {
    this.store.dispatch(
      CartsPageActions.orderCartItem({
        cart: this.id(),
        date: this.date,
        addressId: this.addressId(),
        billingAddressId: this.addressId(),
      }),
    )
    // Order confirmation is displayed upon successful order
    this.router.navigate(['/orderConf', this.id()]).then()
  }
}
