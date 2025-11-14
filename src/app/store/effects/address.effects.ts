import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AddressApiActions, AddressPageActions } from '../actions/address.actions'
import { EMPTY } from 'rxjs'
import { AddressService } from '../../service/address.service'
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable()
export class AddressEffects {
  private actions$ = inject(Actions)
  private addressService = inject(AddressService)

  loadAddresses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressPageActions.loadAddresses),
      switchMap(() => {
        return this.addressService.fetchAddresses().pipe(
          map(addresses => AddressApiActions.retrievedAddresses({ addresses })),
          catchError(() => EMPTY),
        )
      }),
    )
  })

  createAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressPageActions.createAddress),
      switchMap(({ street, houseNumber, zip, addressType, firstName, name, city }) => {
        return this.addressService
          .createAddress(street, houseNumber, zip, addressType, firstName, name, city)
          .pipe(
            map(AddressPageActions.loadAddresses),
            catchError(() => EMPTY),
          )
      }),
    )
  })
}
