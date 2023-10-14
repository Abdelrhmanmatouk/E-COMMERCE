import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[],searchTrem:string): Product[] {
    return products.filter((item)=> item.title.toLowerCase().includes(searchTrem.toLowerCase()))
  }

}
