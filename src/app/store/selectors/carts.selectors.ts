import { createSelector, createFeatureSelector } from '@ngrx/store'
import { CartItem } from '../../model/cartItem.model'

export const selectCartItems = createFeatureSelector<ReadonlyArray<CartItem>>('cartItems')

export const selectCollectionState = createFeatureSelector<ReadonlyArray<number>>('collection')

export const selectCartCollection = createSelector(
  selectCartItems,
  selectCollectionState,
  (carts, collection) => {
    return collection.map(id => carts.find(cart => cart.id === id)!)
  },
)
