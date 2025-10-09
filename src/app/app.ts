import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { vehiclesReducer } from './store/reducers/vehicles.reducer'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
