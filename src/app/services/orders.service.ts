import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  baseUrl:string="https://ecommerce.routemisr.com/api/v1/"

userdata = new BehaviorSubject("")
decodedUserData= new BehaviorSubject(null)

constructor(private _HttpClient:HttpClient) {

  let token = localStorage.getItem("userToken")
  if(token){


    this.userdata.next(token!)


    let decodeToken : any = jwtDecode(token!)




    this.decodedUserData.next(decodeToken)


  }


}



  getAllOrders(userID:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`orders/user/${userID}`)
  }
}
