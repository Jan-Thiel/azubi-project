import { EventEmitter, Inject, inject, Injectable, PLATFORM_ID } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Customer } from '../model/customer.model'
import { SsrCookieService } from 'ngx-cookie-service-ssr'
import { Auth } from '../model/auth.model'
import { isPlatformBrowser } from '@angular/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Store } from '@ngrx/store'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  cookieService = inject(SsrCookieService)
  store = inject(Store)
  platformId

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.platformId = platformId
  }

  loginChange = new EventEmitter()

  async login(email: string, password: string) {
    try {
      let reply = this.http.post<Auth>('http://localhost:8080/api/customers/login', {
        email: email,
        password: password,
        withCredentials: true,
      })

      reply.subscribe(auth => {
        // Set all necessary cookies when logged in
        this.cookieService.set('userId', String(auth.customer.customerId), { expires: 5 })
        this.cookieService.set('refreshToken', auth.refreshToken, { expires: 5 })
        // This check is necessary to avoid runtime errors due to SSR
        if (isPlatformBrowser(PLATFORM_ID)) {
          sessionStorage.setItem('jwttoken', auth.token)
        }
        // Notify the Navbar of a login
        this.loginChange.emit(true)
      })
    } catch (error) {
      this.loginChange.emit(false)
      throw error
    }
  }

  getUserData(): Observable<Customer> {
    return this.http.get<Customer>('http://localhost:8080/api/customers/user', {
      withCredentials: true,
    })
  }

  signup(email: string, password: string, firstName: string, surname: string): boolean {
    let checkParameters = new HttpParams().append('email', email)
    this.http
      .get<boolean>('http://localhost:8080/api/customers/checkEmail', {
        params: checkParameters,
        withCredentials: true,
      })
      .subscribe(check => {
        if (check) {
          let parameters = new HttpParams()
            .append('email', email)
            .append('password', password)
            .append('firstName', firstName)
            .append('surname', surname)
          let reply = this.http.get<Auth>('http://localhost:8080/api/customers/signup', {
            params: parameters,
            withCredentials: true,
          })
          reply.subscribe(auth => {
            this.login(email, password).then()
          })
          return true
        } else {
          return false
        }
      })
    return false
  }

  changeEmail(email: string) {
    this.http.post('http://localhost:8080/api/customers/changeEmail', {
      email: email,
      withCredentials: true,
    })
  }

  changePassword(password: string, newPassword: string) {
    this.http.post('http://localhost:8080/api/customers/changePassword', {
      password: password,
      newPassword: newPassword,
      withCredentials: true,
    })
  }

  ngOnInit() {
    this.loginChange.emit(false)
    if (isPlatformBrowser(PLATFORM_ID)) {
      this.cookieService.set('isAnon', 'false', { expires: 1 })
    }
  }
}
