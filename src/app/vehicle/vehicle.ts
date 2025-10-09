import { Component, inject, input, signal } from '@angular/core'
import { VehicleService } from '../service/vehicle.service'
import { Vehicle } from '../model/vehicle.model'

@Component({
  selector: 'vehicle',
  imports: [],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.css',
})
export class VehicleComponent {
  readonly item = input.required<Vehicle>()

  vehicle = signal<Vehicle | undefined>(undefined)

  ngOnInit(): void {
    this.vehicle.set(this.item())
  }
}
