import { Component } from '@angular/core';
import { Order } from 'src/app/entity/order';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: Order[] = []; // Renamed from 'order' to 'orders' for clarity

  constructor(private dbService: SdaHttpClient<Order>) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dbService.getAll('Order').subscribe((res) => {
      this.orders = res;
    });
  }

  deleteOrder(id: number) {
    this.dbService.delete('Order', id).subscribe(() => {
      alert('Order Deleted');
      this.getData(); // Refresh the list after deletion
    });
  }
}
