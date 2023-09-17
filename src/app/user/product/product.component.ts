import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product[] = [];
  constructor(private router: Router,private dbService: SdaHttpClient<Product>) {
  }

  ngOnInit(): void {
    this.getData();
  }


  selectedCategory: string = ''; 
  filteredProducts: any[] = this.product; 

  filterProducts() {
    if (this.selectedCategory === 'All Categories') {
      this.filteredProducts = this.product;
    } else {
      this.filteredProducts = this.product.filter((product) => product.category === this.selectedCategory);
    }
  }

  getData() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.product = res;

    });
  }

  navigateToOrder() {
    this.router.navigate(['/User/Order']);
  }


}
