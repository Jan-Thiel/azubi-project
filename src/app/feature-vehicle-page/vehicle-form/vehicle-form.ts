import { Component, inject, input, PLATFORM_ID } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CartItemService } from '../../service/cartItem.service'
import { Vehicle } from '../../model/vehicle.model'
import { isPlatformBrowser } from '@angular/common'
import { Store } from '@ngrx/store'
import { VehiclesPageActions } from '../../store/actions/vehicle.actions'

@Component({
  selector: 'vehicle-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  cartItemService = inject(CartItemService)
  store = inject(Store)
  platformId = inject(PLATFORM_ID)
  time = 1
  quantity = 1
  readonly item = input.required<Vehicle>()
  makeCartItem(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(
        VehiclesPageActions.putInCart({
          vehicle: this.item().vehicleID,
          time: this.time,
          pricePerDay: this.item().pricePerDay,
          quantity: this.quantity,
        }),
      )
    } else {
      alert('What is even going on?')
    }
  }
}
