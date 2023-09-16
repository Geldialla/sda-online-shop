import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { OrdersComponent } from './user/orders/orders.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { LoginComponent } from './share/login/login.component';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
import { ProductsComponent } from './admin/products/products.component';
import { UserPageComponent } from './user/user-page/user-page.component';


const routes: Routes = [
  {
    path: 'User',
    component: UserPageComponent,
    children:[
      {
        path: 'User-page',
        component: UserPageComponent
      }
    ]
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Product-Details',
    component: ProductDetailsComponent
  },
  
  {
    path: 'Order',
    component: OrdersComponent
  },
  {
    path: 'Category',
    component: CategoriesComponent
  },
  {
    path: 'Product-details',
    component: ProductDetailsComponent
  },
  
  {
    path: 'Admin', component: AdminpageComponent,
    children: [
      {
        path: '',
        redirectTo: 'Product',
        pathMatch: 'full',
      },
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
