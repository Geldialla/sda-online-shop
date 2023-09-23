// app.component.ts or parent component

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor() {}

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }
}
