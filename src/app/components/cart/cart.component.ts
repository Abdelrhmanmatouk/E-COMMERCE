import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  totalCartPrice: number = 0;
  errorMessage: string = '';
  isLooding: boolean = false;
  productCount:number=0
  updateProductCountTimeout:any
  cartid:string=""

  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this.isLooding=true
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.isLooding=false
        this.cartProducts = res.data.products;
        this.totalCartPrice = res.data.totalCartPrice;
        this.productCount=res.data.count
        this.cartid=res.data._id
      },
      error: (err) => {
        console.log(err.error.message);
        this.isLooding = false;
        if (err.error.message.includes('No cart exist for this user:')) {
          this.errorMessage = err.error.message;
        }
      },
    });
  }
  removeCartProduct(productId: string) {
    this._CartService.removeProductFromCart(productId).subscribe({
      next: (res) => {


        this.cartProducts = res.data.products;
        this.totalCartPrice = res.data.totalCartPrice;
        this.productCount=res.data.count
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearUserCart() {
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartProducts = [];
          this.totalCartPrice = 0;
          this._CartService.cartNumber.next(0)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateCartCount(productId:string,count:number,index:number){
    this.cartProducts[index].count =count
    this.totalCartPrice += this.cartProducts[index].price
clearTimeout(this.updateProductCountTimeout)
    this.updateProductCountTimeout=setTimeout(()=>{
      this._CartService.updateCartCount(productId,count).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartProducts = res.data.products;
          this.totalCartPrice = res.data.totalCartPrice;
          this.productCount=res.data.count

        },error:(err)=>{
          console.log(err);
          this.getLoggedUserCart()
        }
      })
    },500)


  }
}
