import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  islooding: boolean = false;
  errorMessage:string =""
  constructor(private _Authservice: AuthService, private _Router: Router) {
    if (localStorage.getItem("userToken") != null){
      _Router.navigate(['/home'])
    }
  }

  registrationform: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[A-Z][a-zA_Z0-9]+$/),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%&? "])[a-zA-Z0-9!@#$%&? ]{6,16}$/
      ),
    ]),
    rePassword: new FormControl(
      '',
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%&? "])[a-zA-Z0-9!@#$%&? ]{8,16}$/
      )
    ),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  register(registrationform: FormGroup) {
    console.log(registrationform.controls['name'].errors);

    if (registrationform.valid) {
      this.errorMessage=""
      this.islooding = true;
      this._Authservice.register(registrationform.value).subscribe({
        next: (res) => {
          this.islooding = false;
          if (res.message == 'success')
           this._Router.navigate(['login']);
        },
        error: (err) => {
          console.log(err.error.message);
          this.errorMessage=err.error.message;

          this.islooding = false;
        },
      });
    }else{
      this.registrationform.markAllAsTouched()
    }
  }
}
