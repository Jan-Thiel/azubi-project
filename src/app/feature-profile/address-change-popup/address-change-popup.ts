import { Component, inject, input, OnInit, output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AddressPageActions } from '../../store/actions/address.actions'
import { AddressService } from '../../service/address.service'

@Component({
  selector: 'app-address-change-popup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './address-change-popup.html',
  styleUrl: './address-change-popup.css',
})
export class AddressChangePopup implements OnInit {
  close = output<void>()

  firstName = input.required<string>()
  name = input.required<string>()
  street = input.required<string>()
  houseNumber = input.required<string>()
  city = input.required<string>()
  zip = input.required<string>()
  id = input.required<number>()

  model_firstName: string | undefined
  model_name: string | undefined
  model_street: string | undefined
  model_houseNumber: string | undefined
  model_city: string | undefined
  model_zip: string | undefined

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
  }

  ngOnInit(): void {
    this.store.dispatch(AddressPageActions.loadAddresses())
    this.model_firstName = this.firstName()
    this.model_name = this.name()
    this.model_street = this.street()
    this.model_houseNumber = this.houseNumber()
    this.model_city = this.city()
    this.model_zip = this.zip()
  }
}
