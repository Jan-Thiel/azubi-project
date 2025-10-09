import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemService } from '../service/cartItem.service';
import { Router } from '@angular/router';
import { CartsPageActions } from '../store/actions/carts.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-order',
  imports: [
    FormsModule
  ],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {
  router = inject(Router)
  store = inject(Store)
  id = input.required<number>()
  address: string = ""
  billingAddress: string = ""
  date: string = ""

  order(): void{
    this.store.dispatch(CartsPageActions.orderCartItem({ cart: this.id(), address: this.address, billingAddress: this.billingAddress, date: this.date }))
    this.router.navigate(["/orderConf", this.id()])
  }


}
