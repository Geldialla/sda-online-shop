import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkLoggedInUser();
  }

  checkLoggedInUser() {
    const userString = localStorage.getItem('loggedInUser');
    if (userString) {
      this.loggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedIn = false;
    this.router.navigate(['/User/Product']);
  }
}
