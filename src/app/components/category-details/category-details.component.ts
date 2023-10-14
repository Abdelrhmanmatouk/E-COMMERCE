import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  categoryId: string | null = '';
  categoryDetails = {
    name: '',
    image: '',
  };
  AllSubCategoriesOnCategory: any[] = [];
  productsInCategory:any[]=[]

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CategoriesService: CategoriesService,
    private _CartService:CartService, private _AuthService:AuthService ,private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      },
    });
    this._CategoriesService.getSpecificCategory(this.categoryId).subscribe({
      next: (res) => {
        console.log(res.data);

        this.categoryDetails = res.data;
      },
    });
    this._CategoriesService.GetAllSubCategoriesOnCategory(this.categoryId).subscribe({
        next: (res) => {
          console.log(res);
          this.AllSubCategoriesOnCategory = res.data;
        },
      });
      this._CategoriesService.GetspecificSubCategory(this.categoryId).subscribe({
        next: (res) => {
          console.log(res);
          this.productsInCategory=res.data
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
}
