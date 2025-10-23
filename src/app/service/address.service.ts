import { inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { CookieService } from './cookie.service'
import { Address } from '../model/address.model'

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  cookieService = inject(CookieService)

  constructor(private http: HttpClient) {}

  fetchAddresses(document: Document) {
    console.log('Tryied fetching addresses')
    return this.http.get<Address[]>('http://localhost:8080/api/addresses', {
      params: new HttpParams().append('id', this.cookieService.getCookie('userId', document)),
    })
  }

  createAddress(
    document: Document,
    street: string,
    houseNumber: string,
    zip: string,
    type: string | null,
    firstName: string,
    name: string,
    city: string,
  ) {
    return this.http.post<ReadonlyArray<Address>>('http://localhost:8080/api/addresses', {
      street: street,
      houseNumber: houseNumber,
      zip: zip,
      type: type,
      firstName: firstName,
      name: name,
      city: city,
      customerId: this.cookieService.getCookie('userId', document),
    })
  }

  removeAddress(id: number) {
    this.http.post('http://localhost:8080/api/addresses/delete', { id: id })
  }
}
