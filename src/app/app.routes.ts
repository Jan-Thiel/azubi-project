import { Routes } from '@angular/router'
import { Cart } from './feature-cart/cart/cart'
import { VehicleList } from './feature-vehicle-page/vehicle-list/vehicle-list'
import { Login } from './feature-login/login/login'
import { Signup } from './feature-signup/signup/signup'
import { OrderConf } from './feature-cart/order-conf/order-conf'
import { Orders } from './orders/orders'
import { ProfilePage } from './feature-profile/profile-page/profile-page'
import { Logout } from './feature-login/logout/logout'
import { NoPage } from './feature-no-page/no-page/no-page'
import { Homepage } from './homepage/homepage';

export const routes: Routes = [
  {
    path: 'vehicles',
    title: 'Listings',
    component: VehicleList,
  },
  {
    path: 'cart',
    title: 'Cart',
    component: Cart,
  },
  {
    path: '',
    title: 'Home',
    component: Homepage,
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
    path: 'orderConf/:id',
    title: 'Order Confirmation',
    component: OrderConf,
  },
  {
    path: 'orders',
    title: 'Orders',
    component: Orders,
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfilePage,
  },
  {
    path: 'logout',
    title: '',
    component: Logout,
  },
  {
    path: '**',
    title: '404',
    component: NoPage,
  },
]
