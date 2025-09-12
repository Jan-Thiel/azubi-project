import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleService } from './vehicle.service';
import { Vehicle } from "./vehicle";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Vehicle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('azubi-project');
  vehicleService = inject(VehicleService);
  vehicles = this.vehicleService.fetchVehicleApi();
}
