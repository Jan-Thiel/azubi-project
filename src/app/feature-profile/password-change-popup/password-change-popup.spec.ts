import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PasswordChangePopup } from './password-change-popup'

describe('PasswordChangePopup', () => {
  let component: PasswordChangePopup
  let fixture: ComponentFixture<PasswordChangePopup>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChangePopup],
    }).compileComponents()

    fixture = TestBed.createComponent(PasswordChangePopup)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
