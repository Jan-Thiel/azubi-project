import { Component, inject, input } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CartItemService } from '../service/cartItem.service'
import { Vehicle } from '../model/vehicle.model'
import { CookieService } from '../service/cookie.service'

@Component({
  selector: 'vehicle-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  cookieService = inject(CookieService)
  cartItemService = inject(CartItemService)
  time = 1
  quantity = 1
  readonly item = input.required<Vehicle>()
  makeCartItem(): void {
    console.log('User Cookie: ', this.cookieService.getCookie('userId', document))
    this.cartItemService.createCartItem(
      this.item().vehicleID,
      this.time,
      parseInt(this.cookieService.getCookie('userId', document)),
      this.item().pricePerDay * this.time * this.quantity,
      this.quantity,
    )
    alert('The vehicle has been added to your cart.')
    console.log('VehicleID: ' + this.item().vehicleID)
  }
}
