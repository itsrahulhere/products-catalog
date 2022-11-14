import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  
  public getProducts() {
    return this.http.get(`http://localhost:9001/products`);
  }
 
  public getOneProduct(id:number) {
    return this.http.get("http://localhost:9001/products/"+id);
  }
  
  public getDelivery(productcode:number, pincode:number) {
    return this.http.get("http://localhost:9001/delivery/"+productcode+"/"+pincode);
  }

  public getSearchProducts(str:string) {
    return this.http.get(`http://localhost:9001/products/search/`+str);
  }
}
