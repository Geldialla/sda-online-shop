import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { SdaHttpClient } from 'src/app/services/data-layer/sda-be-mock.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  orderid: number = 0;
  isEditMode: boolean = false;

  user: Partial<User> = {
    name: '',
    lastName: '',
    adress: '',
    phoneNumber: undefined,
    email: '',
    password: undefined,
  }

  constructor(private route: ActivatedRoute, private router: Router, private dbService: SdaHttpClient<User>) {
    this.orderid = this.route.snapshot.params['id'];
    this.isEditMode = this.orderid != 0 && this.orderid != undefined;
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.getUserData(this.orderid)
    }
  }


  getUserData(id: number) {
    this.dbService.getById('User', id).subscribe((user: User) => {
      this.user = user
    })
  }

  save() {
    if (this.isEditMode) {
      this.dbService.put('User', this.orderid, this.user as User).subscribe((res) => {
        console.log(res);
        alert("User updated")
      })
    } else {
      this.dbService.post('User', this.user as User).subscribe((res) => {
        console.log(res);
        alert("User created")
      })
      this.router.navigate(['/Login']);
    }
  }
}
