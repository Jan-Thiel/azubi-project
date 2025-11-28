import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Vehicle } from '../model/vehicle.model'

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  fetchVehicleApi() {
    return this.http.get<Vehicle[]>('http://localhost:8080/api/vehicles')
  }
}
