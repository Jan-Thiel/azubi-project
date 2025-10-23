import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Vehicle } from '../../model/vehicle.model'

export const selectVehicles = createFeatureSelector<ReadonlyArray<Vehicle>>('vehicles')

export const selectCollectionState = createFeatureSelector<ReadonlyArray<number>>('collection')

export const selectBookCollection = createSelector(
  selectVehicles,
  selectCollectionState,
  (vehicles, collection) => {
    return collection.map(id => vehicles.find(vehicle => vehicle.vehicleID === id)!)
  },
)
