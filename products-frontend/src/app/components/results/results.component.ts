import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { max } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  str: any;
  isLogIn = false;
  apple = "apple";
  productBrands:any = new Set();
  isNoProducts = false;
  isInvalidValue = false;
  isInvalidValue2 = false;
  allProducts:any = [];
  allProductsResult:any = [];
  filterProducts:any = [];
  brandFilterProducts:any = [];
  selectedBrand:any;

  priceForm = new FormGroup({
    minPrice: new FormControl(''),
    maxPrice: new FormControl('')
  })

  constructor(public api:LoginService, public productApi:ProductsService, public router:Router, private route:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.isLogIn = this.api.isLoggedIn();
    this.route.params.subscribe(params=>{
      this.str = params['str'];
    })

    this.api.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLogIn = this.api.isLoggedIn();
    });

    if(this.str == '' || this.str == "null" || this.str == null) {
      this.productApi.getProducts().subscribe(res=>{
        this.allProducts = res;
        this.allProductsResult = res;
        for(let item of this.allProductsResult) {
          this.productBrands.add(item.brand);
        }   
      })
    } else {
      this.productApi.getSearchProducts(this.str).subscribe(res=>{
        this.allProducts = res;
        this.allProductsResult = res;
        for(let item of this.allProductsResult) {
          this.productBrands.add(item.brand);
        }
        if(this.allProducts == '') {
          this.isNoProducts = true;
        }
      })
    }    

  }



  onSelectedBrand(event:any) {
    this.isNoProducts = false;
    this.brandFilterProducts = [];
    this.selectedBrand = event;
    if(this.selectedBrand === "all" ) {
      this.allProducts = this.allProductsResult;
      return;
    }

    for (let item of this.allProductsResult) {
      if (item.brand.toLowerCase() === this.selectedBrand.toLowerCase()) {
        this.brandFilterProducts.push(item);
      }
    }

    this.allProducts = this.brandFilterProducts;
  }

  get f() {
    return this.priceForm.controls;
  }

  priceFilter() {
    this.filterProducts = [];
    this.isNoProducts = false;
    this.isInvalidValue = false;
    this.isInvalidValue2 = false;
    let minPrice:any = this.priceForm.value.minPrice;
    let maxPrice:any = this.priceForm.value.maxPrice;


    if (minPrice == '' && maxPrice != '') {
      minPrice = 0;
    } else if (minPrice != '' && (maxPrice == '' || maxPrice == null)) {
      maxPrice = Number.MAX_SAFE_INTEGER;
    } else if  ((minPrice == '' || minPrice == null) && (maxPrice == '' || maxPrice == null)) {
      minPrice = 0;
      maxPrice = Number.MAX_SAFE_INTEGER;
    }

    
    if(minPrice > maxPrice) {
      this.isInvalidValue = true;
      return;
    } 

    if(this.brandFilterProducts == '' || this.selectedBrand == "all") {
      for (let item of this.allProductsResult) {
        if (item.price >= minPrice && item.price <= maxPrice) {
          this.filterProducts.push(item);
        }
      }
    } else {
      for (let item of this.brandFilterProducts) {
        if (item.price >= minPrice && item.price <= maxPrice) {
          this.filterProducts.push(item);
        }
      }
    }
    
    this.allProducts = this.filterProducts;
    if(this.allProducts == '') {
      this.isNoProducts = true;
    }
  }

}
