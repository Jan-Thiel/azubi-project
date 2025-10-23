import { Component, inject, input, output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AddressPageActions } from '../store/actions/address.actions'
import { AddressService } from '../service/address.service'

@Component({
  selector: 'app-address-change-popup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './address-change-popup.html',
  styleUrl: './address-change-popup.css',
})
export class AddressChangePopup {
  close = output<void>()

  firstName = input.required<string>()
  name = input.required<string>()
  street = input.required<string>()
  houseNumber = input.required<string>()
  city = input.required<string>()
  zip = input.required<string>()
  id = input.required<number>()

  model_firstName = this.firstName()
  model_name = this.name()
  model_street = this.street()
  model_houseNumber = this.houseNumber()
  model_city = this.city()
  model_zip = this.zip()
  model_id = this.id()

  store = inject(Store)
  addressService = inject(AddressService)

  addAddress(): void {
    this.store.dispatch(
      AddressPageActions.createAddress({
        street: this.street(),
        houseNumber: this.houseNumber(),
        zip: this.zip(),
        addressType: null,
        firstName: this.firstName(),
        name: this.name(),
        city: this.city(),
      }),
    )
    this.addressService.removeAddress(this.id())
  }

  onClose() {
    this.close.emit()
    console.log('Popup close button pressed')
  }

  ngOnInit(): void {
    this.store.dispatch(AddressPageActions.loadAddresses())
  }
}
