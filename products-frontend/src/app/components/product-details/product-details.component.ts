import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  isAvailable = 0;
  id:any;
  product:any={};
  delivery:any={};
  expectedtime:any;
  pincode:any;

  deliveryForm = new FormGroup({
    inputpincode: new FormControl(),
  });



  constructor(private api:ProductsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      console.log(this.id);
    })
    this.api.getOneProduct(this.id).subscribe(res=>{
      this.product = res;
    })
   
  }

  setTimeDate() {
    if (this.delivery == null) {
      this.isAvailable = 2;
      return;
    }
    this.expectedtime = new Date();
    this.expectedtime.setDate(this.expectedtime.getDate() + this.delivery.days);
    this.expectedtime = this.expectedtime.toISOString().slice(0,10);
    console.log(this.expectedtime);
    if (this.delivery.days== null) {
      this.isAvailable = 3;
      return;
    }
    this.isAvailable = 1;
  }

  checkDelivery(productcode: any) {
    if (this.deliveryForm.value.inputpincode == null) {
      this.isAvailable = 3;
      return;
    }
    this.api.getDelivery(productcode,this.deliveryForm.value.inputpincode).subscribe(res=>{
      this.delivery = res;
      console.log(res);
      this.setTimeDate();
    },err=>{
      this.isAvailable = 2;
    })
  }



}
