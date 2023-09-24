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
    productId: undefined,
    quantity: undefined,
  };
  user: Partial<User> = {};
  product: Partial<Product> = {};

  userName: string = '';

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

          const productString = localStorage.getItem('selectedProduct');
          if (productString) {
            this.product = JSON.parse(productString);
            console.log('Product Name:', this.product.pName);
          }
        }
      });
    }

    const userString = localStorage.getItem('loggedInUser');
    if (userString) {
      const user = JSON.parse(userString);
      this.userName = user.name;
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
        console.log('User Name:', this.userName);
        console.log('Product Name:', this.product.pName);
        console.log('Quantity:', this.order.quantity);
        localStorage.removeItem('selectedProduct');

        this.router.navigate(['/User/Product']);
      });
    } else {
      const userString = localStorage.getItem('loggedInUser');
      if (userString) {
        const user = JSON.parse(userString);
        var userId = user.id;
        console.log('User ID:', userId);
      }
      this.order.userId= userId; 
      this.dbService.post('Order', this.order as Order).subscribe((res) => {
        console.log('Order created');
        console.log('User Name:', this.userName);
        console.log('Product Name:', this.product.pName);
        console.log('Quantity:', this.order.quantity);

        localStorage.removeItem('selectedProduct');

        this.router.navigate(['/User/Product']);
      });
    }
  }

}
