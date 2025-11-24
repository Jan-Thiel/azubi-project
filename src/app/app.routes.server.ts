import { RenderMode, ServerRoute } from '@angular/ssr'
import { OrderConf } from './feature-cart/order-conf/order-conf'

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'orderConf/:id',
    renderMode: RenderMode.Client,
  },
]
