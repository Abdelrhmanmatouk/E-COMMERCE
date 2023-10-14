import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  numofwishlistitems:BehaviorSubject<number> = new BehaviorSubject(0)
  baseUrl:string="https://ecommerce.routemisr.com/api/v1/"
  constructor(private _HttpClient:HttpClient) {
    this.Getloggeduserwishlist().subscribe((res)=>{
     
this.numofwishlistitems.next(res.count)
    })
   }
  AddProductToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`wishlist`,{
      productId: productId
    },{
      headers:{
        token: localStorage.getItem("userToken")||""
      }
    })
  }
  Getloggeduserwishlist():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`wishlist`,{
      headers:{
        token:localStorage.getItem("userToken")||""
      }
    })
  }
  Removeproductfromwishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`wishlist/${productId}`,{
      headers:{
        token:localStorage.getItem("userToken")||""
      }
    })
  }
}
