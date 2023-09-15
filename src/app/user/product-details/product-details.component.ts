import { Component } from '@angular/core';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product[] = [];
  constructor(private dbService: SdaHttpClient<Product>) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.product = res;
      
    });
  }

}
