import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from './pipes/search.pipe';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    ProductComponent,
    ProductDetailsComponent,
    NotfoundComponent,
    CheckoutComponent,
    SearchPipe,
    CategoryDetailsComponent,
    WishlistComponent,
    ForgetpasswordComponent,
    BrandDetailsComponent,
    AllordersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
