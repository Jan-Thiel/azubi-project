import { Component, input } from '@angular/core';


@Component({
  selector: 'vehicle',
  imports: [],
  template: `
  <div>
        <h3>{{ type() }}</h3>
        <p>{{ brand() }} {{ model() }}</p>
        <p>Price per day: {{ pricePerDay() }}€</p>
  </div>
  `,
})
export class Vehicle {
  readonly type = input<string>();
  readonly brand = input<string>();
  readonly model = input<string>();
  readonly pricePerDay = input<string>();
}
