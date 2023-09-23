import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

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

  constructor(private router: Router, private userService: SdaHttpClient<User>) { }
  
  login() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      console.log('Admin login successful');
      this.router.navigate(['/Admin']);
    } else {
      this.userService.getAll('User').subscribe((users) => {
        const user = users.find((u) => u.email === this.email && u.password === this.password);
  
        if (user) {
          console.log('User login successful');
          this.router.navigate(['/User/Product']);
        } else {
          console.log('Login failed');
          this.errorMessage = 'Invalid email or password. Please try again.';
          this.isValidLogin = false;
        }
      });
    }
  }

  createUser() {
    
  }

  navigateToCreateUser() {
    this.router.navigate(['/CreateUser']);
  }

}


