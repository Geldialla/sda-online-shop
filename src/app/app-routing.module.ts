import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';

const routes: Routes = [
  { path: 'Products', component: ProductsComponent},
  { path: 'Order', component: OrdersComponent},
  // { path: 'Products', component: ProductsComponent},
  { path: 'Product-List', component: ProductListComponent},
  { path: 'Category-list', component: CategoryListComponent},
  { path: 'Order-List', component: OrderListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
