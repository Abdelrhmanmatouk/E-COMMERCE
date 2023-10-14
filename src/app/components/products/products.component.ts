import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  searchTerm: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe((res) => {
      console.log(res);

      this.products = res.data;
      this.pageSize = res.metadata.limit;
      this.currentPage = res.metadata.currentPage;
      this.total = res.results;
    });
    this._ProductsService.searchTerm.subscribe((res) => {
      this.searchTerm = res;
console.log(this.searchTerm);

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
  pageChanged(event:any):void{
    console.log(event);

    this._ProductsService.getAllProducts(event).subscribe((res) => {
      console.log(res.data);

      this.products = res.data;
      this.pageSize = res.metadata.limit;
      this.currentPage = res.metadata.currentPage;
      this.total = res.results;
    });
  }
}
