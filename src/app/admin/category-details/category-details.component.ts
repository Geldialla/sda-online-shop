import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent {
  categoryId: number = 0;
  isEditMode: boolean = false;
  category: Partial<Category> = {
    categoryName: '',
  }
  constructor(private route: ActivatedRoute, private router: Router, private dbService: SdaHttpClient<Category>) {
    this.categoryId = +this.route.snapshot.params['id'];
    this.isEditMode = this.categoryId !== 0 && !isNaN(this.categoryId);
  }
  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.categoryId);
    }
  }
  getUserData(id: number) {
    this.dbService.getById('Category', id).subscribe((category: Category) => {
      this.category = category
    })
  }
  save() {
    if (this.isEditMode) {
      this.dbService.put('Category', this.categoryId, this.category as Category).subscribe((res) => {
        console.log(res);
        alert('Category updated');
        this.router.navigate(['/Admin/Product']);
      });
    } else {
      this.dbService.post('Category', this.category as Category).subscribe((res) => {
        console.log(res);
        alert('Category created');
      });
      this.router.navigate(['/Admin/Product']);
    }
  }
}