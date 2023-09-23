import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/entity/order';
import { Product } from 'src/app/entity/product';
import { User } from 'src/app/entity/user';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private dbService: SdaHttpClient<Order>,
    private userService: SdaHttpClient<User>,
    private productService: SdaHttpClient<Product>
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dbService.getAll('Order').subscribe((res) => {
      this.orders = res;
      this.orders.forEach((order) => {
        this.userService.getById('User', order.userId).subscribe((user: User) => {
          order.userName = user.name;
        });
        this.productService.getById('Product', order.productId).subscribe((product: Product) => {
          order.userId = product.pName;
        });
      });
    });
  }

  deleteOrder(id: number) {
    this.dbService.delete('Order', id).subscribe(() => {
      alert('Order Deleted');
      this.getData();
    });
  }
}
