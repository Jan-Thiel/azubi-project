import { Component, input, signal } from '@angular/core'
import { Vehicle } from '../model/vehicle.model'
import { CartItem } from '../model/cartItem.model'

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  readonly item = input.required<CartItem>()
  readonly vehicleItem = input.required<readonly Vehicle[] | null>()

  cartItem = signal<CartItem | undefined>(undefined)
  vehicle = signal<Vehicle | undefined>(undefined)

  ngOnInit(): void {
    this.cartItem.set(this.item())
    this.vehicle.set(this.vehicleItem()![this.cartItem()!.vehicleId])
  }
}
