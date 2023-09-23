import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { OrdersComponent } from './user/orders/orders.component';
import { LoginComponent } from './share/login/login.component';
import { ProductsComponent } from './admin/products/products.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { ProductComponent } from './user/product/product.component';
import { AboutComponent } from './user/about/about.component';
import { CreateUserComponent } from './share/create-user/create-user.component';
import { UserListComponent } from './admin/user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'User/Product',
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'CreateUser',
    component: CreateUserComponent
  },
  {
    path: 'User',
    component: UserPageComponent,
    children: [
      
      {
        path: 'Product',
        component: ProductComponent
      },
      {
        path: 'User-page',
        component: UserPageComponent
      },
      {
        path: 'Order',
        component: OrdersComponent
      },
      {
        path: 'About',
        component: AboutComponent
      },
    ]
  },
  {
    path: 'Admin', component: AdminpageComponent,
    children: [
      {
        path: 'Product',
        component: ProductsComponent
      },
      {
        path: 'Products-List',
        component: ProductListComponent
      },
      {
        path: 'Order-List',
        component: OrderListComponent
      },
      {
        path: 'User-List',
        component: UserListComponent
      },
    ]
  },
  { path: 'Admin/Products-List/:id', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
