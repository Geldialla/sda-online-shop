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
    image: '',
    title: '',
    pName: '',
    category: '',
    description: '',
    price: 0,
  }
  
  fileContent: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dbService: SdaHttpClient<Product>) {
    this.productId = +this.route.snapshot.params['id'];
    this.isEditMode = this.productId !== 0 && !isNaN(this.productId);
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.productId);
    }
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
