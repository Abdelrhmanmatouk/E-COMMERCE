import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ForgetpassService } from 'src/app/services/forgetpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  usermsg: string = '';

  constructor(private _ForgetpassService: ForgetpassService, private _Authservice:AuthService,private _Router: Router) {}

  forgetform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  resetcodeform: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });
  resetpassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%&? "])[a-zA-Z0-9!@#$%&? ]{6,16}$/
      ),
    ]),
  });

  forgetpassword(): void {
    let useremail = this.forgetform.value;
    this.email = useremail.email;
    this._ForgetpassService.forgetpassword(useremail).subscribe({
      next: (res) => {
        console.log(res);
        this.usermsg = res.message;
        this.step1 = false;
        this.step2 = true;
      },error:(err)=>{
        this.usermsg=err.error.message
      }
    });
  }

  resetcode(): void {
    let resetcode = this.resetcodeform.value
    this._ForgetpassService.resetcode(resetcode).subscribe({
      next:(res)=>{
        console.log(res);

        this.usermsg = res.status;
        this.step2=false
        this.step3=true
      },error:(err)=>{
        console.log(err);
        this.usermsg = err.error.message;
      }
    })
  }

  newpassword(): void {
    let newpass =this.resetpassword.value
    newpass.email = this.email
    this._ForgetpassService.resetpassword(newpass).subscribe({
      next:(res)=>{
if(res.token){
  localStorage.setItem("userToken",res.token)
  this._Authservice.isUserLoggedIn.next(true)
  this._Router.navigate(['/home']);
}

      },error:(err)=>{
        this.usermsg = err.error.message;
      }
    })
  }
}
