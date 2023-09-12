import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Product[] = [];
  constructor(private dbService: SdaHttpClient<any>) { }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.product = res
    })
  }
}
