import { Component, inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CustomerService } from '../../service/customer.service'

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  email: string = ''
  password: string = ''
  firstName: string = ''
  surname: string = ''
  customerService = inject(CustomerService)

  validateEmail(email: string): boolean {
    let regex = new RegExp('^[\\w\-\.]+@([\\w-]+\\.)+[\\w-]{2,}$')
    return regex.test(email)
  }

  validatePassword(pass: string): boolean {
    let regex = new RegExp(
      '^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9])(?=\\S*?[?!§$%&()=\\-.,:;<>|*#~]).{6,})\\S$',
    )
    return regex.test(pass)
  }

  signup(): void {
    this.customerService.signup(this.email, this.password, this.firstName, this.surname)
  }
}
