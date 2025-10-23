import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Address } from '../../model/address.model'

export const AddressPageActions = createActionGroup({
  source: 'Address Component',
  events: {
    'Load Addresses': emptyProps,
    'Create Address': props<{
      street: string
      houseNumber: string
      zip: string
      addressType: string | null
      firstName: string
      name: string
      city: string
    }>(),
  },
})

export const AddressApiActions = createActionGroup({
  source: 'Address Api',
  events: {
    'Retrieved Addresses': props<{
      addresses: ReadonlyArray<Address>
    }>(),
  },
})
