import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Order } from '../../model/order.model'

export const selectOrders = createFeatureSelector<ReadonlyArray<Order>>('orders')

export const selectCollectionState = createFeatureSelector<ReadonlyArray<number>>('collection')

export const selectOrderCollection = createSelector(
  selectOrders,
  selectCollectionState,
  (orders, collection) => {
    return collection.map(id => orders.find(order => order.id === id)!)
  },
)
