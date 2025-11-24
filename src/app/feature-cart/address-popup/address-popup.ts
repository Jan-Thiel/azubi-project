import { Component, inject, OnInit, output, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AddressPageActions } from '../../store/actions/address.actions'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'app-address-popup',
  imports: [FormsModule],
  templateUrl: './address-popup.html',
  styleUrl: './address-popup.css',
})
export class AddressPopup implements OnInit{
  close = output<void>()

  firstName: string = ''
  name: string = ''
  street: string = ''
  houseNumber: string = ''
  city: string = ''
  zip: string = ''

  store = inject(Store)
  platformId = inject(PLATFORM_ID)

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
  }

  ngOnInit(): void {
    // Load all addresses of the user
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AddressPageActions.loadAddresses())
    }
  }
}
