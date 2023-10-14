import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartid:string=""
constructor(private _ActivatedRoute:ActivatedRoute,private _CheckoutService:CheckoutService){
  _ActivatedRoute.params.subscribe((params)=>{
    console.log(params["id"]);
    this.cartid=params["id"]

  })
}
shippingAddress :FormGroup = new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl(''),
})

checkout(shippingAddress:FormGroup){
  console.log(shippingAddress.value);
 this._CheckoutService.onlineCheckout(this.cartid,shippingAddress.value).subscribe((res)=>{
  console.log(res.session.url);
  location.href =res.session.url

 })

}
}
