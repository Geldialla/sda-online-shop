import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './share/login/login/login.component';
import { AdminpageComponent } from './admin/admin-page/adminpage/adminpage.component';
import { OrdersComponent } from './admin/admin-page/orders/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductlistComponent } from './user/productlist/productlist.component';
import { ProductdetailsComponent } from './user/productdetails/productdetails.component';
import { OrderComponent } from './user/order/order.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminpageComponent,
    OrdersComponent,
    UsersComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    OrderComponent,
    ProductListComponent,
    CategoryListComponent,
    OrderListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }