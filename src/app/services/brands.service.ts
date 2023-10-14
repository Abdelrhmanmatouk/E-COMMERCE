import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string="https://ecommerce.routemisr.com/api/v1/"
  GetAllBrands():Observable<any>{
    return this._HttpClient.get( this.baseUrl + `brands` )
  }
  Getspecificbrand(brandid:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `brands/${brandid}` )
  }
  getpProductInSpecificBrand(brandid:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products?brand=${brandid}` )
  }
}
