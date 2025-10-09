import { createReducer, on } from '@ngrx/store'

import { CartsApiActions } from '../actions/carts.actions'
import { CartItem } from '../../model/cartItem.model'

export const initialState: ReadonlyArray<CartItem> = []

export const cartsReducer = createReducer(
  initialState,
  on(CartsApiActions.retrievedCartsList, (_state, { carts }) => carts),
)
