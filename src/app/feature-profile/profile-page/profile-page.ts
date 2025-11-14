import { Component, inject, signal } from '@angular/core'
import { Store } from '@ngrx/store'
import { CustomerService } from '../../service/customer.service'
import { Customer } from '../../model/customer.model'
import { selectAddress } from '../../store/selectors/address.selectors'
import { AddressPageActions } from '../../store/actions/address.actions'
import { AsyncPipe } from '@angular/common'
import { AddressService } from '../../service/address.service'
import { AddressPopup } from '../../feature-cart/address-popup/address-popup'
import { AddressChangePopup } from '../address-change-popup/address-change-popup'
import { Observable } from 'rxjs'
import { Address } from '../../model/address.model'
import { EmailChangePopup } from '../email-change-popup/email-change-popup'
import { PasswordChangePopup } from '../password-change-popup/password-change-popup'

@Component({
  selector: 'app-profile-page',
  imports: [AsyncPipe, AddressPopup, AddressChangePopup, EmailChangePopup, PasswordChangePopup],
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
  emailPopupVisible = signal(false)
  passwordPopupVisible = signal(false)

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

  onOpenChangePopup(address: Address) {
    this.firstName = address.firstName
    this.name = address.name
    this.street = address.street
    this.houseNumber = address.houseNumber
    this.city = address.city
    this.zip = address.zip
    this.id = address.id
    this.changePopupVisible.set(true)
  }

  onCloseEmailPopup() {
    this.emailPopupVisible.set(false)
  }

  onOpenEmailPopup() {
    this.emailPopupVisible.set(true)
  }

  onClosePasswordPopup() {
    this.passwordPopupVisible.set(false)
  }

  onOpenPasswordPopup() {
    this.passwordPopupVisible.set(true)
  }

  ngOnInit() {
    this.store.dispatch(AddressPageActions.loadAddresses())
    this.customer$ = this.customerService.getUserData()
  }
}
