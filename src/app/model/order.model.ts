import { Address } from './address.model'

export interface Order {
  date: string
  time: number
  brand: string
  model: string
  price: number
  quantity: number
  address: string
  billingAddress: string
  id: number
}
