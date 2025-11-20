import { Component, inject, output } from '@angular/core'
import { CustomerService } from '../../service/customer.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-password-change-popup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './password-change-popup.html',
  styleUrl: './password-change-popup.css',
})
export class PasswordChangePopup {
  customerService = inject(CustomerService)

  password: string | undefined
  newPassword: string | undefined
  close = output<void>()

  onClose() {
    this.close.emit()
  }

  changePassword() {
    this.customerService.changePassword(this.password!, this.newPassword!)
  }
}
