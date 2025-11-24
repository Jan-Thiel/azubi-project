import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { VehicleService } from '../../service/vehicle.service'
import { VehiclesApiActions, VehiclesPageActions } from '../actions/vehicle.actions'
import { CartItemService } from '../../service/cartItem.service'
import { CartsPageActions } from '../actions/carts.actions'

@Injectable()
export class VehiclesEffects {
  private actions$ = inject(Actions)
  private vehiclesService = inject(VehicleService)
  private cartItemService = inject(CartItemService)

  loadVehicles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VehiclesPageActions.loadVehicles),
      switchMap(() =>
        this.vehiclesService.fetchVehicleApi().pipe(
          map(vehicles => VehiclesApiActions.retrievedVehicleList({ vehicles })),
          catchError(() => EMPTY),
        ),
      ),
    )
  })
  putInCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VehiclesPageActions.putInCart),
      switchMap(({ vehicle, time, pricePerDay, quantity }) =>
        this.cartItemService
          .createCartItem(vehicle, time, pricePerDay * time * quantity, quantity)
          .pipe(
            map(cartItem => CartsPageActions.loadCartItems()),
            catchError(() => EMPTY),
          ),
      ),
    )
  })
}
