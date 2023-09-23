import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/entity/order';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orderid: number = 0;
  isEditMode: boolean = false;

  order: Partial<Order> = {
    userId: undefined,
    productId: undefined,
    quanity: undefined,
  }

  constructor(private route: ActivatedRoute, private router: Router, private dbService: SdaHttpClient<Order>) {
    this.orderid = this.route.snapshot.params['id'];
    this.isEditMode = this.orderid != 0 && this.orderid != undefined;
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.orderid)
    }
  }


  getUserData(id: number) {
    this.dbService.getById('Order', id).subscribe((order: Order) => {
      this.order = order
    })
  }

  save() {
    if (this.isEditMode) {
      this.dbService.put('Order', this.orderid, this.order as Order).subscribe((res) => {
        console.log(res);
        alert("Order updated")
      })
    } else {
      this.dbService.post('Order', this.order as Order).subscribe((res) => {
        console.log(res);
        alert("Order created")
      })
      this.router.navigate(['/Admin/Order-List']);
    }
  }
}
