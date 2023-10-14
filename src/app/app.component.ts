import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-commerce';
  constructor(private _Authservice: AuthService){
    if(localStorage.getItem("userToken")!=null){
      _Authservice.isUserLoggedIn.next(true)
    }
  }
  gotoup(){
    scrollTo(0,0)
  }
}
