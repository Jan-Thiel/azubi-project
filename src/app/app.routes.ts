import { Routes } from '@angular/router';
import { App } from './app';
import { Cart } from './cart/cart';
import { VehicleList } from './vehicle-list/vehicle-list';

export const routes: Routes = [{
    path: '',
    title: 'App Home Page',
    component: VehicleList,
  },
  {
    path: 'cart',
    title: 'Cart',
    component: Cart,
  },
  ];
