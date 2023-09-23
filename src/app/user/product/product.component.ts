import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product[] = [];
  selectedCategory: string = '';
  filteredProducts: Product[] = this.product;

  constructor(
    private router: Router,
    private dbService: SdaHttpClient<Product>
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  filterProducts() {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.product;
    } else {
      this.filteredProducts = this.product.filter((product) => product.category === this.selectedCategory);
    }
  }

  getData() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.product = res;
      this.filteredProducts = this.product;
    });
  }

  navigateToOrder(productId: number) {
    this.router.navigate(['/User/Order'], { queryParams: { productId } });
  }
}
