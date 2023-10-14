import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-square-caret-left text-black"></i>',
      '<i class="fa-solid fa-square-caret-right text-black"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  productId: string = '';
  productDetails!: Product;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService : CartService,
    private _AuthService :AuthService,
    private toastr:ToastrService
  ) {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';
    });
    this._ProductsService.getProductDetails(this.productId).subscribe((res) => {
      console.log(res.data);
      this.productDetails = res.data;
    });
  }
  addProductTcart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('product added to cart', 'success');
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error: (err) => {
        if (err.error.message == 'Invalid Token. please login again') {
          this._AuthService.logOut();
        }
      },
    });
  }
}
