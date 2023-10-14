import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isUserInloginPage:boolean=false
  cartNum: number = 0;
  numOfWishlist:number =0
  searchTerm: string = '';
  constructor(
    private _Authservice: AuthService,
    private _CartService: CartService,
    private _ProductsService:ProductsService,
    private _WishlistService:WishlistService
  ) {
    _Authservice.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res;
    });
_WishlistService.numofwishlistitems.subscribe((res)=>{

this.numOfWishlist=res
})
  }

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
      },
    });
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems;
      },
    });
  }
 inputvalue(event:any){
// console.log(event.target['value']);
this._ProductsService.searchTerm.next(event.target['value'])

 }
  logOut() {
    this._Authservice.logOut();
  }
}
