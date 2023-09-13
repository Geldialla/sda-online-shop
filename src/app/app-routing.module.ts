import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';


const routes: Routes = [
  
  {
    path: 'Admin', component: AdminpageComponent,
    children: [
      {
        path: 'Products',
        component: ProductsComponent
      },
      {
        path: 'Products-List',
        component: ProductListComponent
      },
      {
        path: 'Order',
        component: OrdersComponent
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
      },
    ]

  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
