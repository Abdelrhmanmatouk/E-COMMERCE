import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForgetpassService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string="https://ecommerce.routemisr.com/api/v1/auth/"
forgetpassword(useremail:object):Observable<any>{
 return this._HttpClient.post(this.baseUrl +'forgotPasswords' ,useremail)
}
resetcode(resetCode:object):Observable<any>{
  return this._HttpClient.post(this.baseUrl +'verifyResetCode' ,resetCode)
 }
 resetpassword(formdata:object):Observable<any>{
  return this._HttpClient.put(this.baseUrl+`resetPassword`,formdata)
 }
}
