import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { OrdersComponent } from './user/orders/orders.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { LoginComponent } from './share/login/login.component';
import { ProductsComponent } from './admin/products/products.component';
import { UserPageComponent } from './user/user-page/user-page.component';


const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'User',
    component: UserPageComponent,
    children:[
      {
        path: '',
        redirectTo: 'User-page',
        pathMatch: 'full',
      },
      {
        path: 'User-page',
        component: UserPageComponent
      },
      {
        path: 'Order',
        component: OrdersComponent
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
        path: 'Category',
        component: CategoriesComponent
      },
      {
        path: 'Category-List',
        component: CategoryListComponent
      }
    ]

  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
