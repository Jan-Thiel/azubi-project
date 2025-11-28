import { Component, input, OnInit, signal } from '@angular/core'
import { CartItem } from '../../model/cartItem.model'

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent implements OnInit {
  readonly item = input.required<CartItem>()

  cartItem = signal<CartItem | undefined>(undefined)

  ngOnInit(): void {
    this.cartItem.set(this.item())
  }
}
