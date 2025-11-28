import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrderPopup } from './order-popup'

describe('OrderPopup', () => {
  let component: OrderPopup
  let fixture: ComponentFixture<OrderPopup>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPopup],
    }).compileComponents()

    fixture = TestBed.createComponent(OrderPopup)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
