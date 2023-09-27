import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entity/category';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private dbService: SdaHttpClient<Category>) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dbService.getAll('Category').subscribe((res) => {
      this.categories = res;
    });
  }

  deleteUser(id: number) {
    this.dbService.delete('Category', id).subscribe((res) => {
      console.log(res);
      alert('Category Deleted');
      this.getData();
    });
  }
}
