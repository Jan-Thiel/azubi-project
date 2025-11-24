import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core'
import { NavigationStart, Router, RouterOutlet } from '@angular/router'
import { CustomerService } from './service/customer.service'
import { SsrCookieService } from 'ngx-cookie-service-ssr'
import { isPlatformBrowser } from '@angular/common'
import { first } from 'rxjs'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  customerService = inject(CustomerService)
  cookieService = inject(SsrCookieService)
  router = inject(Router)
  platformId = inject(PLATFORM_ID)

  logged = signal(false)
  anon = signal(false)

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId
  }

  ngOnInit() {
    this.customerService.loginChange.pipe(first()).subscribe(logged => {
      this.logged.set(logged)
      if (isPlatformBrowser(PLATFORM_ID)) {
        if (this.cookieService.get('isAnon') === 'false') {
          this.anon.set(true)
        }
      }
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url.includes('/logout')) {
        this.cookieService.delete('userId')
        this.cookieService.delete('refreshToken')
        sessionStorage.removeItem('jwttoken')
        this.router.navigate(['/login']).then()
      } else if (event instanceof NavigationStart) {
        if (isPlatformBrowser(this.platformId)) {
          if (this.cookieService.check('jwt')) {
            this.customerService.loginChange.emit(true)
          }
        }
      }
    })
  }
}
