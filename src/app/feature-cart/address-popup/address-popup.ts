import { Component, EventEmitter, inject, output, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { selectAddress } from '../../store/selectors/address.selectors'
import { AddressPageActions } from '../../store/actions/address.actions'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-address-popup',
  imports: [FormsModule],
  templateUrl: './address-popup.html',
  styleUrl: './address-popup.css',
})
export class AddressPopup {
  close = output<void>()

  firstName: string = ''
  name: string = ''
  street: string = ''
  houseNumber: string = ''
  city: string = ''
  zip: string = ''

  store = inject(Store)

  addAddress(): void {
    this.store.dispatch(
      AddressPageActions.createAddress({
        street: this.street,
        houseNumber: this.houseNumber,
        zip: this.zip,
        addressType: null,
        firstName: this.firstName,
        name: this.name,
        city: this.city,
      }),
    )
  }

  onClose() {
    // This is called when the popup closes
    this.close.emit()
    console.log('Popup close button pressed')
  }

  ngOnInit(): void {
    // Load all addresses of the user
    this.store.dispatch(AddressPageActions.loadAddresses())
  }
}
