import { inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Customer } from '../model/customer.model'
import { CookieService } from './cookie.service'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  cookieService = inject(CookieService)
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    let parameters = new HttpParams().append('email', email).append('password', password)
    let reply = this.http.get<Customer>('http://localhost:8080/api/customers/login', {
      params: parameters,
    })
    reply.subscribe(customer => {
      console.log(customer)
      this.cookieService.setCookie('userId', customer.customerId, 5, '', document)
    })
  }

  signup(email: string, password: string, firstName: string, surname: string): boolean {
    let checkParameters = new HttpParams().append('email', email)
    this.http
      .get<boolean>('http://localhost:8080/api/customers/checkEmail', { params: checkParameters })
      .subscribe(check => {
        if (check) {
          let parameters = new HttpParams()
            .append('email', email)
            .append('password', password)
            .append('firstName', firstName)
            .append('surname', surname)
          let reply = this.http.get<Customer>('http://localhost:8080/api/customers/signup', {
            params: parameters,
          })
          reply.subscribe(customer =>
            this.cookieService.setCookie('userid', customer.customerId, 5, '', document),
          )
          return true
        } else {
          return false
        }
      })
    return false
  }
}
