import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CartItemService } from '../service/cartItem.service'
import { VehiclesPageActions } from '../store/actions/vehicle.actions'
import { CartsPageActions } from '../store/actions/carts.actions'
import { Store } from '@ngrx/store'
import { combineLatest, Observable } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { Vehicle } from '../model/vehicle.model'
import { selectVehicles } from '../store/selectors/vehicles.selectors'
import { CartItem } from '../model/cartItem.model'
import { selectCartItems } from '../store/selectors/carts.selectors'

@Component({
  selector: 'app-order-conf',
  imports: [],
  templateUrl: './order-conf.html',
  styleUrl: './order-conf.css',
})
export class OrderConf {
  cartItemService = inject(CartItemService)
  store = inject(Store)
  route = inject(ActivatedRoute)

  productId: number | undefined
  item: CartItem | undefined

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('id')!, 10)
      console.log('Product ID from route:', this.productId)
    })

    console.log('Dispatching load actions...')
    this.store.dispatch(CartsPageActions.loadCartItems())
    let cartItems$: Observable<readonly CartItem[]> = this.store.select(selectCartItems)
    // Debug cart items separately
    cartItems$.pipe(tap(items => console.log('CartItems$ emitted:', items))).subscribe()

    cartItems$
      .pipe(
        tap(items => {
          console.log('CombineLatest emitted - CartItems:', items.length)
        }),
      )
      .subscribe(items => {
        console.log('Items: ', items)
        this.item = items.find(i => i.id === this.productId)
        console.log('Found item:', this.item)
      })
  }
}
