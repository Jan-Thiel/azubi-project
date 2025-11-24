import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CartsPageActions } from '../../store/actions/carts.actions'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { CartItem } from '../../model/cartItem.model'
import { selectCartItems } from '../../store/selectors/carts.selectors'

@Component({
  selector: 'app-order-conf',
  imports: [],
  templateUrl: './order-conf.html',
  styleUrl: './order-conf.css',
})
export class OrderConf implements OnInit{
  store = inject(Store)
  route = inject(ActivatedRoute)

  productId: number | undefined
  item: CartItem | undefined

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('id')!, 10)
    })

    this.store.dispatch(CartsPageActions.loadCartItems())
    let cartItems$: Observable<readonly CartItem[]> = this.store.select(selectCartItems)
    cartItems$.subscribe(items => {
      this.item = items.find(i => i.id === this.productId)
    })
  }
}
