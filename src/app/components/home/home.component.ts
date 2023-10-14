import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  CategoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 7,
      },
    },
    nav: true,
  };
  products: Product[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  constructor(
    private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService,

  ) {

  }

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe((res) => {
      this.products = res.data;

    });
    this._CategoriesService.getAllCategories().subscribe((res) => {
      this.categories = res.data;
    });

    this._ProductsService.searchTerm.subscribe((res) => {
      this.searchTerm = res;


    });
  }

  // search(){
  //   this._NavbarComponent.searchTerm=this.term
  // }
}
