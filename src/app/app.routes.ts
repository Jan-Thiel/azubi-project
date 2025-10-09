import { Routes } from '@angular/router'
import { Cart } from './cart/cart'
import { VehicleList } from './vehicle-list/vehicle-list'
import { Login } from './login/login'
import { Signup } from './signup/signup'
import { OrderConf } from './order-conf/order-conf';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: VehicleList,
  },
  {
    path: 'cart',
    title: 'Cart',
    component: Cart,
  },
  {
    path: 'login',
    title: 'Login',
    component: Login,
  },
  {
    path: 'signup',
    title: 'Sign Up',
    component: Signup,
  },
  {
    path: "orderConf/:id",
    title: "Order Confirmation",
    component: OrderConf,
    }
]
