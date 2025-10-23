import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Address } from '../../model/address.model'

export const selectAddress = createFeatureSelector<ReadonlyArray<Address>>('addresses')

export const selectCollectionState = createFeatureSelector<ReadonlyArray<number>>('collection')

export const selectCartCollection = createSelector(
  selectAddress,
  selectCollectionState,
  (addresses, collection) => {
    return collection.map(id => addresses.find(address => address.id === id)!)
  },
)
