import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number = 0;
  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    private dbService: SdaHttpClient<Product>,
    private categoryService: SdaHttpClient<Category>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.products = res;
    });
    
    this.categoryService.getAll('Category').subscribe((categ) => {
      this.categories = categ;
    });
  }

  getCategoryName(categoryId: number): string | undefined {
    const category = this.categories.find(x => x.id === categoryId);
    return category ? category.categoryName : undefined;
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
  
  
  applyCategoryFilter() {
    console.log('applyCategoryFilter called');
    
    if (this.selectedCategory === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  
    console.log('selectedCategory:', this.selectedCategory);
    console.log('filteredProducts:', this.filteredProducts);
    console.log('products:', this.products);
    
    this.cdr.detectChanges();
  }

  
}
