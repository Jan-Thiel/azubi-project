import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Vehicle } from '../model/vehicle.model'
import { selectVehicles } from '../store/selectors/vehicles.selectors'
import { CartItem } from '../model/cartItem.model'
import { selectCartItems } from '../store/selectors/carts.selectors'
import { VehiclesPageActions } from '../store/actions/vehicle.actions'
import { CartsPageActions } from '../store/actions/carts.actions'
import { AsyncPipe } from '@angular/common'
import { VehicleForm } from '../vehicle-form/vehicle-form'
import { CartItemComponent } from '../cart-item/cart-item'
import { CartItemForm } from '../cart-item-form/cart-item-form'
import { Order } from '../order/order';

@Component({
  selector: 'cart',
  imports: [AsyncPipe, CartItemComponent, CartItemForm, Order],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private store = inject(Store)
  vehicles$: Observable<readonly Vehicle[]> = this.store.select(selectVehicles)
  cartItems$: Observable<readonly CartItem[]> = this.store.select(selectCartItems)

  ngOnInit(): void {
    this.store.dispatch(VehiclesPageActions.loadVehicles())
    this.store.dispatch(CartsPageActions.loadCartItems())
  }
}
