import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Order } from '../../model/order.model'

export const OrdersActions = createActionGroup({
  source: 'OrdersPage',
  events: {
    'Load Orders': emptyProps,
  },
})

export const OrdersApiActions = createActionGroup({
  source: 'OrdersApiActions',
  events: {
    'Retrieved Orders': props<{ orders: ReadonlyArray<Order> }>(),
  },
})
