import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { signal } from '@angular/core';

interface Vehicle {
        type: string;
        brand: string;
        model: string;
        pricePerDay: number;
    }
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
    
    constructor(private http: HttpClient) {}
  vehiclesResult = signal<Vehicle[]>([{type: "", brand: "", model: "", pricePerDay: 0}]);

  setVehicle(vehicle: Vehicle[]){
    this.vehiclesResult.set(vehicle)
  }

  fetchVehicleApi() {
    this.http.get<Vehicle[]>("localhost:8080\api\vehicles").subscribe(vehicles => this.setVehicle(vehicles))
  }
}
