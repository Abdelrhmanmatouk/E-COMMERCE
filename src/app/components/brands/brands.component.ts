import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit
 {
constructor(private _BrandsService:BrandsService){}

allbrands:any[]=[]

ngOnInit(): void {
  this.getAllBrands()
}
getAllBrands(){
  this._BrandsService.GetAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
this.allbrands=res.data
    }
  })
}


}
