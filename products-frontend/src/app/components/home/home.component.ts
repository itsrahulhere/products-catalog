import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm = new FormGroup({
    searchtext: new FormControl()
  });

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  searchProducts() {
    if (this.searchForm.value.searchtext == null || this.searchForm.value.searchtext == "null") {
      this.searchForm.value.searchtext = "";
    }
    this.router.navigate(["products/"+this.searchForm.value.searchtext]);
  }

}
