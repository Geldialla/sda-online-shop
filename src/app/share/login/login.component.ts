import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isValidLogin: boolean = true;

  constructor(private router: Router) { }

  login() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      console.log('Login successful');
      this.router.navigate(['/Admin']);
    } else {
      console.log('Login failed');
      this.errorMessage = 'Invalid email or password. Please try again.';
      this.isValidLogin = false;
    }
  }

  navigateToProduct() {
    this.router.navigate(['/User/Product']);
  }

}
