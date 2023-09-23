import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/entity/order';
import { Product } from 'src/app/entity/product';
import { User } from 'src/app/entity/user';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderid: number = 0;
  isEditMode: boolean = false;
  order: Partial<Order> = {
    userId: undefined,
    // Define productId as a number here
    ['productId']: undefined,
    quantity: undefined,
  };
  user: Partial<User> = {
    name: undefined,
  };
  product: Partial<Product> = {
    pName: undefined,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: SdaHttpClient<Order>,
    private userService: SdaHttpClient<User>,
    private productService: SdaHttpClient<Product>
  ) {
    this.orderid = this.route.snapshot.params['id'];
    this.isEditMode = this.orderid != 0 && this.orderid != undefined;
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.orderid);
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['productId']) {
          this.order['productId'] = params['productId'];
        }
      });
    }
  }

  getUserData(id: number) {
    this.dbService.getById('Order', id).subscribe((order: Order) => {
      this.order = order;
      if (order.userId && order.productId) {
        this.userService.getById('User', order.userId).subscribe((user: User) => {
          this.user = user;
        });
        this.productService.getById('Product', order.productId).subscribe((product: Product) => {
          this.product = product;
        });
      }
    });
  }

  save() {
    if (this.isEditMode) {
      this.dbService.put('Order', this.orderid, this.order as Order).subscribe((res) => {
        console.log('Order updated');
        if (this.product && this.user) {
          console.log('Product Name:', this.product.pName);
          console.log('User Name:', this.user.name);
        }
        this.router.navigate(['/User/Product']);
      });
    } else {
      this.dbService.post('Order', this.order as Order).subscribe((res) => {
        console.log('Order created');
        if (this.product && this.user) {
          console.log('Product Name:', this.product.pName);
          console.log('User Name:', this.user.name);
        }
        this.router.navigate(['/User/Product']);
      });
    }
  }
}
