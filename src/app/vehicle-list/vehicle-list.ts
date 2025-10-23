import { Component, inject, OnInit } from '@angular/core'
import { VehicleComponent } from '../vehicle/vehicle'
import { FormsModule } from '@angular/forms'
import { VehicleForm } from '../vehicle-form/vehicle-form'
import { Store } from '@ngrx/store'
import { selectVehicles } from '../store/selectors/vehicles.selectors'
import { Vehicle } from '../model/vehicle.model'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { VehiclesPageActions } from '../store/actions/vehicle.actions'

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule, VehicleComponent, FormsModule, VehicleForm],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
})
export class VehicleList implements OnInit {
  private store = inject(Store)

  vehicles$: Observable<readonly Vehicle[]> = this.store.select(selectVehicles)

  ngOnInit(): void {
    this.store.dispatch(VehiclesPageActions.loadVehicles())
  }
}
