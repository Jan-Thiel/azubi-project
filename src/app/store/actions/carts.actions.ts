import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { CartItem } from '../../model/cartItem.model'

export const CartsActions = createActionGroup({
  source: 'Vehicles',
  events: {
    'Get Vehicles': props<{ id: number }>(),
  },
})

export const CartsApiActions = createActionGroup({
  source: 'Carts API',
  events: {
    'Retrieved Carts  List': props<{ carts: ReadonlyArray<CartItem> }>(),
    'Ordered CartItem': props<{ cartItem: ReadonlyArray<CartItem> }>(),
    'Changed CartItem Quantity': props<{ cartItem: ReadonlyArray<CartItem> }>(),
    'Changed CartItem Time': props<{ cartItem: ReadonlyArray<CartItem> }>(),
  },
})

export const CartsPageActions = createActionGroup({
  source: 'CartItems Page',
  events: {
    'Load CartItems': emptyProps,
    'Order CartItem': props<{ cart: number, address: string, billingAddress: string, date: string }>(),
    'Change CartItem Quantity': props<{ cartItem: number; quant: number }>(),
    'Change CartItem Time': props<{ cartItem: number; time: number }>(),
  },
})
