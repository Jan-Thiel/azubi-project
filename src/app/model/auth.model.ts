import { Customer } from './customer.model'

export interface Auth {
  customer: Customer
  token: string
  refreshToken: string
}
