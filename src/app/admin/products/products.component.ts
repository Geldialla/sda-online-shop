import { Component } from '@angular/core';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

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

  deleteUser(id: number) {
    this.dbService.delete('Product', id).subscribe((res) => {
      console.log(res);
      alert('product Deleted');
      this.getData()
    });
  }
}
