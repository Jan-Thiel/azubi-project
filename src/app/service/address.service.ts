import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Address } from '../model/address.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  fetchAddresses(): Observable<readonly Address[]> {
    return this.http.get<Address[]>('http://localhost:8080/api/addresses', {
      withCredentials: true,
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
    return this.http.post<ReadonlyArray<Address>>(
      'http://localhost:8080/api/addresses',
      {
        street: street,
        houseNumber: houseNumber,
        zip: zip,
        type: type,
        firstName: firstName,
        name: name,
        city: city,
      },
      { withCredentials: true },
    )
  }

  removeAddress(id: number) {
    this.http.post(
      'http://localhost:8080/api/addresses/delete',
      { id: id },
      { withCredentials: true },
    )
  }
}
