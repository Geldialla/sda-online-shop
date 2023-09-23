import { Component } from '@angular/core';
import { User } from 'src/app/entity/user';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  user: User[] = [];
  constructor(private dbService: SdaHttpClient<User>) {
  }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.dbService.getAll('User').subscribe((res) => {
      this.user = res;

    });
  }

  deleteUser(id: number) {
    this.dbService.delete('User', id).subscribe((res) => {
      console.log(res);
      alert('User Deleted');
      this.getData()
    });
  }
}
