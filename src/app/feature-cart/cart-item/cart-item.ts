import { Component, input, signal } from '@angular/core'
import { Vehicle } from '../../model/vehicle.model'
import { CartItem } from '../../model/cartItem.model'

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  readonly item = input.required<CartItem>()

  cartItem = signal<CartItem | undefined>(undefined)

  ngOnInit(): void {
    this.cartItem.set(this.item())
  }
}
