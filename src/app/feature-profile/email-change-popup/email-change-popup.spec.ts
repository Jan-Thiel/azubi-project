import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EmailChangePopup } from './email-change-popup'

describe('EmailChangePopup', () => {
  let component: EmailChangePopup
  let fixture: ComponentFixture<EmailChangePopup>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailChangePopup],
    }).compileComponents()

    fixture = TestBed.createComponent(EmailChangePopup)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
