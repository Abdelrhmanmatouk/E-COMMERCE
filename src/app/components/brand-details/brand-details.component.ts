import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';
WishlistService

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute,private _BrandsService:BrandsService, private _CartService:CartService, private _AuthService:AuthService ,private toastr:ToastrService,private _WishlistService:WishlistService){}
brandID:string|null=''
brandDetails = {
  name: '',
  image: '',
};
productsInBrand:any[]=[]
@Input() product: any;
wishListproducts: string[] = [];

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.brandID = params.get('id');
    },
  });
  this._BrandsService.Getspecificbrand(this.brandID).subscribe({
    next:(res)=>{
      console.log(res);
this.brandDetails=res.data
    }
  })
  this._BrandsService.getpProductInSpecificBrand(this.brandID).subscribe({
    next:(res)=>{
      console.log(res);
this.productsInBrand=res.data
    }
  })
  this._WishlistService.Getloggeduserwishlist().subscribe({
    next: (res) => {
      const data = res.data.map((item: any) => item._id);
      this.wishListproducts = data;
    },
  });
}


addProductTcart(productId:string){
  this._CartService.addProductToCart(productId).subscribe({
    next:(res)=>{

      this.toastr.success('product added to cart', 'success');
      this._CartService.cartNumber.next(res.numOfCartItems)
    },
    error:(err)=>{

      if(err.error.message=="Invalid Token. please login again"){

        this._AuthService.logOut()
      }

    }
  })
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
