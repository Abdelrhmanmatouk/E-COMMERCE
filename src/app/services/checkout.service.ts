import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _HttpClient:HttpClient) { }


  onlineCheckout(cartid:string,shipingAddress:any):Observable<any>{
return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+cartid+'?url=http://localhost:4200/',{
shipingAddress
},{
  headers:{
    token:localStorage.getItem("userToken")||""
  }
})
  }
}
