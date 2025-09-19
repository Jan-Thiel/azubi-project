import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemService } from '../service/cartItem.service';

@Component({
  selector: 'vehicle-form',
  imports: [FormsModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css'
})
export class VehicleForm {
  cartItemService = inject(CartItemService)
  time = 1
  makeCartItem(): void{
    this.cartItemService.createCartItem()
    alert("The vehicle has been added to your cart.")
  }
}
