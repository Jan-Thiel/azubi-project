import { Component, inject, output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CustomerService } from '../../service/customer.service'

@Component({
  selector: 'app-email-change-popup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './email-change-popup.html',
  styleUrl: './email-change-popup.css',
})
export class EmailChangePopup {
  customerService = inject(CustomerService)

  email: string | undefined
  close = output<void>()

  onClose() {
    this.close.emit()
  }

  changeEmail() {
    this.customerService.changeEmail(this.email!)
  }
}
