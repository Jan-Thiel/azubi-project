import { Component, inject, input } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CartItemService } from '../../service/cartItem.service'
import { Vehicle } from '../../model/vehicle.model'
import { SsrCookieService } from 'ngx-cookie-service-ssr'

@Component({
  selector: 'vehicle-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  cookieService = inject(SsrCookieService)
  cartItemService = inject(CartItemService)
  time = 1
  quantity = 1
  readonly item = input.required<Vehicle>()
  makeCartItem(): void {
    this.cartItemService.createCartItem(
      this.item().vehicleID,
      this.time,
      parseInt(this.cookieService.get('userId')),
      this.item().pricePerDay * this.time * this.quantity,
      this.quantity,
    )
  }
}
