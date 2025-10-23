import { Component, inject, input } from '@angular/core'
import { OrderService } from '../service/order.service'
import { Store } from '@ngrx/store'
import { OrdersActions } from '../store/actions/orders.actions'
import { selectOrders } from '../store/selectors/orders.selectors'
import { Observable } from 'rxjs'
import { Order } from '../model/order.model'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-orders',
  imports: [AsyncPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  store = inject(Store)

  orders$: Observable<ReadonlyArray<Order>> = this.store.select(selectOrders)

  ngOnInit() {
    this.store.dispatch(OrdersActions.loadOrders())
  }
}
