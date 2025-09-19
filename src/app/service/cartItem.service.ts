import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';





@Injectable({
  providedIn: 'root',
})
export class CartItemService {
    
    constructor(private http: HttpClient) {}

  createCartItem() {
    this.http.post("http://localhost:8080/api/cartItems", {vehicleId:1, time:5, cartId: 5, price: 40, quantity: 1}).subscribe();
    console.log("posted!")
  }
  
}
