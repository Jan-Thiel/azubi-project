import { Component, inject, OnInit } from '@angular/core';
import { VehicleComponent } from '../vehicle/vehicle';
import { FormsModule } from '@angular/forms';
import { VehicleForm } from '../vehicle-form/vehicle-form';
import { Store } from '@ngrx/store';
import { selectVehicles } from '../state/vehicles.selectors';
import { Vehicle } from '../model/vehicle.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule, VehicleComponent, FormsModule, VehicleForm],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css'
})
export class VehicleList implements OnInit {
  
  private store = inject(Store);

  vehicles$: Observable<readonly Vehicle[]> = this.store.select(selectVehicles);

  time = 0

  ngOnInit(): void {
    this.store.dispatch({ type: '[Vehicles Page] Load Vehicles' });

    this.vehicles$.subscribe(console.log)
  }

}
