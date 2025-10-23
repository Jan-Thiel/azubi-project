import { Component, inject, input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CartItemService } from '../service/cartItem.service'
import { Router } from '@angular/router'
import { CartsPageActions } from '../store/actions/carts.actions'
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
    console.log('OrderComponent: ', this.addressId())
    this.store.dispatch(
      CartsPageActions.orderCartItem({
        cart: this.id(),
        date: this.date,
        addressId: this.addressId(),
        billingAddressId: this.addressId(),
      }),
    )
    this.router.navigate(['/orderConf', this.id()])
  }
}
