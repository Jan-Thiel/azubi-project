import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CartItemForm } from './cart-item-form'

describe('CartItemForm', () => {
  let component: CartItemForm
  let fixture: ComponentFixture<CartItemForm>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemForm],
    }).compileComponents()

    fixture = TestBed.createComponent(CartItemForm)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
