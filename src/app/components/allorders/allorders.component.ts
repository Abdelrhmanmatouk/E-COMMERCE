import { Component ,OnInit} from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})

export class AllordersComponent implements OnInit {
constructor(private _OrdersService:OrdersService){}
userid:string=''
orders:any[]=[]
cartItems:any[]=[]
ngOnInit(): void {
this._OrdersService.decodedUserData.subscribe({
  next:(res)=>{
    if(res){
      console.log(res['id']);
this.userid=res['id']
    }

  }
})



  this._OrdersService.getAllOrders(this.userid).subscribe({
    next:(res)=>{
      console.log(res);
this.orders=res
    }
  })
}

}
