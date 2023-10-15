import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _HttpClient:HttpClient) { }


  onlineCheckout(cartid:string,shipingAddress:any):Observable<any>{
return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=https://e-commerce-pi-rust.vercel.app`,{
shipingAddress
},{
  headers:{
    token:localStorage.getItem("userToken")||""
  }
})
  }
}
