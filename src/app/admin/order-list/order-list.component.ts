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
  products:Product[]=[];
  users:User[]=[];


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
      // Fetch user name and product name for each order
      this.orders.forEach((order) => {
        this.userService.getById('User', order.userId).subscribe((user: User) => {
          order.userName = user.name;
        });
        if (order.productId) {
          this.productService.getById('Product', order.productId).subscribe((product: Product) => {
            // Check if 'product' is defined before accessing 'pName'
            if (product) {
              order.productName = product.pName;
            }
          });
        }
      });
    });

    this.userService.getAll('User').subscribe((users)=>{
      this.users=users
    })

    this.productService.getAll('Product').subscribe((prods)=>{
      this.products=prods
    })
  }
  
  

  deleteOrder(id: number) {
    this.dbService.delete('Order', id).subscribe(() => {
      alert('Order Deleted');
      this.getData();
    });
  }

  getUserNameByUserId(userId: number): string | undefined {
    return this.users.find(x=>x.id==userId)?.name
  }
  getProductNameByProductId(productId: number): string | undefined {
    return this.products.find(x=>x.id==productId)?.pName
  }
}
