import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];
  productCount:number=0
  constructor(private _WishlistService: WishlistService) {}
  ngOnInit(): void {
    this.Getloggeduserwishlist();
  }

  Getloggeduserwishlist() {
    this._WishlistService.Getloggeduserwishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.productCount=res.count
        this.products = res.data;
      },
    });
  }

}
