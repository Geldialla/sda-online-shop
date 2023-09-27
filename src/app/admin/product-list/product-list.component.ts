import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
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
    image: '',
    title: '',
    pName: '',
    description: '',
    price: 0,
  }

  category: Category[] = [];

  fileContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: SdaHttpClient<Product>,
    private categoryService: SdaHttpClient<Category>
  ) {
    this.productId = +this.route.snapshot.params['id'];
    this.isEditMode = this.productId !== 0 && !isNaN(this.productId);
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.productId);
    }

    this.getData()
  }


  public onChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const fileReader: FileReader = new FileReader();

      fileReader.onloadend = (e) => {
        this.fileContent = fileReader.result as string;
      };

      fileReader.readAsDataURL(file);
    }
  }


  getUserData(id: number) {
    this.dbService.getById('Product', id).subscribe((product: Product) => {
      this.product = product
    })

  }
  getData() {
    this.categoryService.getAll('Category',).subscribe((categ) => {
      this.category = categ
    })
  }

  getCategoryName(categoryId: number): string | undefined {
    return this.category.find(x => x.id == categoryId)?.categoryName
  }

  save() {
    if (this.isEditMode) {
      this.product.image = this.fileContent;
      this.dbService.put('Product', this.productId, this.product as Product).subscribe((res) => {
        console.log(res);
        alert('Product updated');
        this.router.navigate(['/Admin/Product']);
      });
    } else {
      this.product.image = this.fileContent;
      this.dbService.post('Product', this.product as Product).subscribe((res) => {
        console.log(res);
        alert('Product created');
      });

      this.router.navigate(['/Admin/Product']);
    }
  }


}
