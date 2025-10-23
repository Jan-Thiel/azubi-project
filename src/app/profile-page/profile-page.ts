import {
  Component,
  inject,
  signal,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { CustomerService } from '../service/customer.service'
import { Customer } from '../model/customer.model'
import { selectAddress } from '../store/selectors/address.selectors'
import { AddressPageActions } from '../store/actions/address.actions'
import { AsyncPipe } from '@angular/common'
import { AddressService } from '../service/address.service'
import { AddressPopup } from '../address-popup/address-popup'
import { AddressChangePopup } from '../address-change-popup/address-change-popup'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  imports: [AsyncPipe, AddressPopup, AddressChangePopup],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  customerService = inject(CustomerService)
  addressService = inject(AddressService)
  store = inject(Store)

  customer$: Observable<Customer> | undefined
  addresses = this.store.select(selectAddress)
  popupVisible = signal(false)
  changePopupVisible = signal(false)

  firstName = ''
  name = ''
  street = ''
  houseNumber = ''
  city = ''
  zip = ''
  id = 0

  deleteAddress(id: number) {
    this.addressService.removeAddress(id)
  }

  onClosePopup() {
    this.popupVisible.set(false)
    console.log('Popup closed')
  }

  onOpenPopup() {
    this.popupVisible.set(true)
  }

  onCloseChangePopup() {
    this.changePopupVisible.set(false)
    console.log('Popup closed')
  }

  onOpenChangePopup(
    firstName: string,
    name: string,
    street: string,
    houseNumber: string,
    zip: string,
    city: string,
    id: number,
  ) {
    this.firstName = firstName
    this.name = name
    this.street = street
    this.houseNumber = houseNumber
    this.city = city
    this.zip = zip
    this.id = id
    this.changePopupVisible.set(true)
  }

  ngOnInit() {
    this.store.dispatch(AddressPageActions.loadAddresses())
    console.log('Fetching user data...')
    this.customer$ = this.customerService.getUserData()
  }
}
