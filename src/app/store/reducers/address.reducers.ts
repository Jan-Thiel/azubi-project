import { Address } from '../../model/address.model'
import { createReducer, on } from '@ngrx/store'
import { AddressApiActions } from '../actions/address.actions'

export const initialState: ReadonlyArray<Address> = []

export const addressReducer = createReducer(
  initialState,
  on(AddressApiActions.retrievedAddresses, (_state, { addresses }) => addresses),
)
