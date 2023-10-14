import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  wishListproducts: string[] = [];
  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this._WishlistService.Getloggeduserwishlist().subscribe({
      next: (res) => {
        const data = res.data.map((item: any) => item._id);
        this.wishListproducts = data;
      },
    });
  }

  addProductTcart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.toastr.success('product added to cart', 'success');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        if (err.error.message == 'Invalid Token. please login again') {
          this._AuthService.logOut();
        }
      },
    });
  }
  AddProductToWishlist(productId: string) {
    this._WishlistService.AddProductToWishlist(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishListproducts = res.data;
      
        this._WishlistService.numofwishlistitems.next(this.wishListproducts.length)
      },
    });
  }
  Removeproductfromwishlist(productId: string) {
    this._WishlistService.Removeproductfromwishlist(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishListproducts = res.data;
        const newProducts = this.product.filter((item: any)=>this.wishListproducts.includes(item._id));
        this.product = newProducts;
        this._WishlistService.numofwishlistitems.next(this.wishListproducts.length)
      },
    });
  }
}
