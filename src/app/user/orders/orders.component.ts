import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  userName: string = '';
  userEmail: string = '';
  userPhoneNumber: number | null = null;
  productName: string = '';

  onSubmit() {
    // Handle form submission here
    console.log('Form submitted:', this.userName, this.userEmail, this.userPhoneNumber, this.productName);
  }
}
