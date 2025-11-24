import { Component, inject, input, PLATFORM_ID } from '@angular/core'
import { OrderService } from '../service/order.service'
import { Store } from '@ngrx/store'
import { OrdersActions } from '../store/actions/orders.actions'
import { selectOrders } from '../store/selectors/orders.selectors'
import { Observable } from 'rxjs'
import { Order } from '../model/order.model'
import { AsyncPipe, isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-orders',
  imports: [AsyncPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  store = inject(Store)
  platformId = inject(PLATFORM_ID)

  orders$: Observable<ReadonlyArray<Order>> = this.store.select(selectOrders)

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(OrdersActions.loadOrders())
    }
  }
}
