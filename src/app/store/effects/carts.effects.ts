import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { CartItemService } from '../../service/cartItem.service'
import { CartsApiActions, CartsPageActions } from '../actions/carts.actions'

@Injectable()
export class CartsEffects {
  private actions$ = inject(Actions)
  private cartsService = inject(CartItemService)

  loadCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CartsPageActions.loadCartItems,
        CartsApiActions.changedCartItemQuantity,
        CartsApiActions.changedCartItemTime,
        CartsApiActions.orderedCartItem,
        CartsApiActions.deletedCartItem,
      ),
      switchMap(() =>
        this.cartsService.fetchCartItems().pipe(
          map(carts => {
            return CartsApiActions.retrievedCartsList({ carts })
          }),
          catchError(error => {
            return EMPTY
          }),
        ),
      ),
    )
  })

  changeCartItemQuantity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartsPageActions.changeCartItemQuantity),
      switchMap(({ cartItem, quant }) =>
        this.cartsService.changeCartItemQuantity(cartItem, quant).pipe(
          map(cartItem => CartsApiActions.changedCartItemQuantity({ cartItem })),
          catchError(() => EMPTY),
        ),
      ),
    )
  })

  changeCartItemTime$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartsPageActions.changeCartItemTime),
      switchMap(({ cartItem, time }) =>
        this.cartsService.changeCartItemTime(cartItem, time).pipe(
          map(cartItem => CartsApiActions.changedCartItemTime({ cartItem })),
          catchError(() => EMPTY),
        ),
      ),
    )
  })

  orderCartItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartsPageActions.orderCartItem),
      switchMap(({ cart, addressId, billingAddressId, date }) =>
        this.cartsService.orderCartItem(cart, addressId, billingAddressId, date).pipe(
          map(cartItem => CartsApiActions.orderedCartItem({ cartItem })),
          catchError(() => EMPTY),
        ),
      ),
    )
  })

  deleteCartItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartsPageActions.deleteCartItem),
      switchMap(({ id }) =>
        this.cartsService.removeCartItem(id).pipe(
          map(carts => {
            return CartsApiActions.deletedCartItem()
          }),
        ),
      ),
    )
  })
}
