import { createReducer, on } from '@ngrx/store';

import { Vehicle } from '../model/vehicle.model';
import { VehiclesApiActions } from './vehicle.actions';


export const initialState: ReadonlyArray<Vehicle> = [];

export const vehiclesReducer = createReducer(
  initialState,
  on(VehiclesApiActions.retrievedVehicleList, (_state, { vehicles }) => vehicles)
);