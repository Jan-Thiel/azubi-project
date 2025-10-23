import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { OrdersActions, OrdersApiActions } from '../actions/orders.actions'
import { OrderService } from '../../service/order.service'

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions)
  private orderService = inject(OrderService)

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap(() =>
        this.orderService.fetchOrdersApi().pipe(
          map(orders => OrdersApiActions.retrievedOrders({ orders })),
          catchError(() => EMPTY),
        ),
      ),
    )
  })
}
