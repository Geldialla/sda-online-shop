import { Component } from '@angular/core';
import { Category } from 'src/app/entity/category';
import { Product } from 'src/app/entity/product';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  product: Product[] = [];
  category: Category[] = [];
  constructor(private dbService: SdaHttpClient<Product>,
    private categoryService: SdaHttpClient<Category>
    ) {
  }

  ngOnInit(): void {
    this.getData();
  }
  

  getData() {
    this.dbService.getAll('Product').subscribe((res) => {
      this.product = res;
      
    });

    this.categoryService.getAll('Category',).subscribe((categ) => {
      this.category = categ
    })
  }

  getCategoryName(categoryId: number): string | undefined {
    return this.category.find(x => x.id == categoryId)?.categoryName
  }

  deleteUser(id: number) {
    this.dbService.delete('Product', id).subscribe((res) => {
      console.log(res);
      alert('Product Deleted');
      this.getData()
    });
  }
}
