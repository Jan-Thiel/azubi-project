import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Vehicle } from '../../model/vehicle.model'

export const VehiclesActions = createActionGroup({
  source: 'Vehicles',
  events: {
    'Get Vehicles': props<{ id: number }>(),
  },
})

export const VehiclesApiActions = createActionGroup({
  source: 'Vehicles API',
  events: {
    'Retrieved Vehicle List': props<{ vehicles: ReadonlyArray<Vehicle> }>(),
  },
})

export const VehiclesPageActions = createActionGroup({
  source: 'Vehicles Page',
  events: {
    'Load Vehicles': emptyProps,
    'Put In Cart': props<{
      vehicle: number
      time: number
      pricePerDay: number
      quantity: number
    }>(),
  },
})
