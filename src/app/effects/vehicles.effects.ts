import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { VehicleService } from '../service/vehicle.service';
import { VehiclesApiActions } from '../state/vehicle.actions';


@Injectable()
export class VehiclesEffects {
  private actions$ = inject(Actions);
  private vehiclesService = inject(VehicleService);

  loadVehicles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Vehicles Page] Load Vehicles'), 
      switchMap(() => this.vehiclesService.fetchVehicleApi().pipe(
        map(vehicles => VehiclesApiActions.retrievedVehicleList({vehicles})), 
        catchError(() => EMPTY)
      ))
    )
  });
}