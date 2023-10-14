import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  islooding: boolean = false;
  errorMessage:string =""
  isUserInloginPage:boolean=true
  constructor(private _Authservice: AuthService, private _Router: Router) {
    if (localStorage.getItem("userToken") != null){
      this._Router.navigate(['/home'])
    }
  }

  loginform: FormGroup = new FormGroup({


    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%&? "])[a-zA-Z0-9!@#$%&? ]{6,16}$/
      ),
    ]),

  });

  Login(loginform: FormGroup) {


    if (loginform.valid) {
      this.errorMessage=""
      this.islooding = true;
      this._Authservice.login(loginform.value).subscribe({
        next: (res) => {
          localStorage.setItem("userToken",res.token)
          this._Authservice.isUserLoggedIn.next(true)
          this.islooding = false;
          if (res.message == 'success')

           this._Router.navigate(['/home']);
           this.isUserInloginPage=false
        },
        error: (err) => {
          console.log(err.error.message);
          this.errorMessage=err.error.message;

          this.islooding = false;

        },
      });
    }else{
      this.loginform.markAllAsTouched()
    }
  }

}



