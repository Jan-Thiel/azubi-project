import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemService } from '../service/cartItem.service';
import { VehiclesPageActions } from '../store/actions/vehicle.actions';
import { CartsPageActions } from '../store/actions/carts.actions';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle.model';
import { selectVehicles } from '../store/selectors/vehicles.selectors';
import { CartItem } from '../model/cartItem.model';
import { selectCartItems } from '../store/selectors/carts.selectors';

@Component({
  selector: 'app-order-conf',
  imports: [],
  templateUrl: './order-conf.html',
  styleUrl: './order-conf.css'
})
export class OrderConf {
  cartItemService = inject(CartItemService)
  store = inject(Store)
  route = inject(ActivatedRoute)

  vehicles$: Observable<readonly Vehicle[]> = this.store.select(selectVehicles)
  cartItems$: Observable<readonly CartItem[]> = this.store.select(selectCartItems)

  productId: number | null = 0
  item: CartItem | undefined
  vehicle: Vehicle | undefined

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('id')!, 10);
    });
    this.store.dispatch(VehiclesPageActions.loadVehicles())
    this.store.dispatch(CartsPageActions.loadCartItems())

    combineLatest([this.cartItems$, this.vehicles$]).subscribe(([items, vehicles]) => {
      this.item = items.find(i => i.id === this.productId);
      this.vehicle = vehicles.find(v => v.id === this.item?.vehicleId);
      console.log(this.vehicle);
    });

  }
}
