import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CustomerService } from '../../service/customer.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = ''
  password: string = ''
  customerService = inject(CustomerService)
  router = inject(Router)

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

  login(): void {
    this.customerService.login(this.email, this.password)
    // User is routed to Vehicle List on login
    this.router.navigate(['/'])
  }
}
