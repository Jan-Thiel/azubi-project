import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Vehicle } from '../model/vehicle.model'

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  fetchVehicleApi() {
    const header = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
    })
    return this.http.get<Vehicle[]>('http://localhost:8080/api/vehicles', { headers: header })
  }
}
