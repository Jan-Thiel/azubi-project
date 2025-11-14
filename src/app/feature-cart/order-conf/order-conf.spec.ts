import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OrderConf } from './order-conf'

describe('OrderConf', () => {
  let component: OrderConf
  let fixture: ComponentFixture<OrderConf>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConf],
    }).compileComponents()

    fixture = TestBed.createComponent(OrderConf)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
