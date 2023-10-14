import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{
      productId:productId
    },{
      headers:{
        token: localStorage.getItem("userToken")||""
      }
    })
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token: localStorage.getItem("userToken") || ""
      }
    })
  }
  removeProductFromCart(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/`+ productId ,{
      headers:{
        token: localStorage.getItem("userToken") || ""
      }
    })
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token: localStorage.getItem("userToken")||""
      }
    })
  }

  updateCartCount(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/`+productId,{
      count
    },{
      headers:{
        token:localStorage.getItem("userToken")||""
      }
    })
  }
}
