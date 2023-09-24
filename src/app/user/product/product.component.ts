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
  products: Product[] = [];
  selectedCategory: string = '';
  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    private dbService: SdaHttpClient<Product>
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  filterProducts() {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) => product.category === this.selectedCategory);
    }
  }

  getData() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.products = res;
      this.filteredProducts = this.products;
    });
  }

  navigateToOrder(productId: number) {
    const userString = localStorage.getItem('loggedInUser');
    if (userString) {
      const user = JSON.parse(userString);
      localStorage.setItem('userId', user.id.toString());
      const selectedProduct = this.products.find((product) => product.id === productId);
      if (selectedProduct) {
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
      }
      this.router.navigate(['/User/Order'], { queryParams: { productId } });
    } else {
      alert('You need to log in or create an account to continue. Do you want to log in or create an account?');
    }
  }
  
  
  
  
}
