import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthGaurd implements CanActivate {
  constructor(private _Router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('userToken') != null){
     try {
      var decoded = jwt_decode(localStorage.getItem("userToken")||"");
      return true
     }catch {
      localStorage.removeItem("userToken")
      this._Router.navigate(["/login"])
      return false
     }
      return true
    }else{
      return false
    }
  }


}
