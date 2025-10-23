import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddressPopup } from './address-popup'

describe('AddressPopup', () => {
  let component: AddressPopup
  let fixture: ComponentFixture<AddressPopup>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressPopup],
    }).compileComponents()

    fixture = TestBed.createComponent(AddressPopup)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
