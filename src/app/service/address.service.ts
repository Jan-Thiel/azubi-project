import { inject, Injectable, PLATFORM_ID } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { SsrCookieService } from 'ngx-cookie-service-ssr'
import { Address } from '../model/address.model'
import { isPlatformBrowser } from '@angular/common'
import { CustomerService } from './customer.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  cookieService = inject(SsrCookieService)
  customerService = inject(CustomerService)

  constructor(private http: HttpClient) {}

  fetchAddresses(): Observable<readonly Address[]> {
    return this.http.get<Address[]>('http://localhost:8080/api/addresses', {
      params: new HttpParams().append('id', 'userIdInsertPlaceholder'),
    })
  }

  createAddress(
    street: string,
    houseNumber: string,
    zip: string,
    type: string | null,
    firstName: string,
    name: string,
    city: string,
  ): Observable<readonly Address[]> {
    return this.http.post<ReadonlyArray<Address>>('http://localhost:8080/api/addresses', {
      street: street,
      houseNumber: houseNumber,
      zip: zip,
      type: type,
      firstName: firstName,
      name: name,
      city: city,
      customerId: 'userIdInsertPlaceholder',
    })
  }

  removeAddress(id: number) {
    this.http.post('http://localhost:8080/api/addresses/delete', { id: id })
  }
}
