import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
baseUrl:string="https://ecommerce.routemisr.com/api/v1/"
  constructor(private _HttpClient:HttpClient) {

  }
  searchTerm:BehaviorSubject<string>=new BehaviorSubject("")
  getAllProducts(pageNum:number=1): Observable<any> {
   return this._HttpClient.get(this.baseUrl+`products?page=${pageNum}`)
  }

  getProductDetails(productId:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl+"products/"+productId)
  }


}
