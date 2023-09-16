import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productId: number = 0;
  isEditMode: boolean = false;

  product: Partial<Product> = {
    title: '',
    pName: '',
    category: '',
    description: '',
    price: 0,
  }

  constructor(private route: ActivatedRoute,private router: Router, private dbService: SdaHttpClient<Product>) {
    this.productId = this.route.snapshot.params['id'];
    this.isEditMode = this.productId != 0 && this.productId != undefined;
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.productId)
    }
  }


  getUserData(id: number) {
    this.dbService.getById('Product', id).subscribe((product: Product) => {
      this.product = product
    })
  }

  save() {
    if (this.isEditMode) {
      this.dbService.put('Product', this.productId, this.product as Product).subscribe((res) => {
        console.log(res);
        alert("Product updated")
      })
    } else {
      this.dbService.post('Product', this.product as Product).subscribe((res) => {
        console.log(res);
        alert("Product created")
      })
      this.router.navigate(['/Admin/Product']);
    }
  }
}
