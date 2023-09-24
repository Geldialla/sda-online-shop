import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './share/login/login.component';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { SdaHttpClientModule } from './services/data-layer/sda-be-mock.module';
import { UserPageComponent } from './user/user-page/user-page.component';
import { ProductComponent } from './user/product/product.component';
import { AboutComponent } from './user/about/about.component';
import { CreateUserComponent } from './share/create-user/create-user.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { CategoryDetailsComponent } from './admin/category-details/category-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminpageComponent,
    OrdersComponent,
    ProductsComponent,
    ProductListComponent,
    OrderListComponent,
    UserListComponent,
    UserPageComponent,
    ProductComponent,
    AboutComponent,
    CreateUserComponent,
    CategoryListComponent,
    CategoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SdaHttpClientModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  

}
