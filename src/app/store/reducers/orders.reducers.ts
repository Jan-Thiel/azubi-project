import { createReducer, on } from '@ngrx/store'
import { Order } from '../../model/order.model'
import { OrdersApiActions } from '../actions/orders.actions'

export const initialState: ReadonlyArray<Order> = []

export const ordersReducer = createReducer(
  initialState,
  on(OrdersApiActions.retrievedOrders, (_state, { orders }) => orders),
)
