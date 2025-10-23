import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddressChangePopup } from './address-change-popup'

describe('AddressChangePopup', () => {
  let component: AddressChangePopup
  let fixture: ComponentFixture<AddressChangePopup>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressChangePopup],
    }).compileComponents()

    fixture = TestBed.createComponent(AddressChangePopup)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
