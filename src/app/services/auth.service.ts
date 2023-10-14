import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _HttpClient: HttpClient,private _Router:Router) {}

  register(registrationform: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registrationform
    );
  }

  login(loginform: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginform
    );
  }

  logOut(){
    localStorage.removeItem("userToken")
    this.isUserLoggedIn.next(false)
    this._Router.navigate(["/login"])
  }
}
