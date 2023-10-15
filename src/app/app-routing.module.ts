import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthGaurd } from './Guards/auth.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },


  { path: 'login' , component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgetpassword',  component: ForgetpasswordComponent },

  { path: 'home', canActivate: [AuthGaurd], component: HomeComponent },
  { path: 'cart', canActivate: [AuthGaurd], component: CartComponent },
  { path: 'brands', canActivate: [AuthGaurd], component: BrandsComponent },
  { path: 'products', canActivate: [AuthGaurd], component: ProductsComponent },
  { path: 'productDetails/:id', canActivate: [AuthGaurd], component: ProductDetailsComponent },
  { path: 'categories', canActivate: [AuthGaurd], component: CategoriesComponent },
  { path: 'categorydetails/:id', canActivate: [AuthGaurd], component: CategoryDetailsComponent },
  { path: 'checkout/:id', canActivate: [AuthGaurd], component: CheckoutComponent },
  { path: 'wishlist', canActivate: [AuthGaurd], component: WishlistComponent },
  { path: 'brandDetails/:id', canActivate: [AuthGaurd], component: BrandDetailsComponent },
  { path: 'allorders', canActivate: [AuthGaurd], component: AllordersComponent },

  { path: '**' , component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
