import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogIn = false;

  constructor(public api:LoginService) { }

  ngOnInit(): void {
    this.isLogIn = this.api.isLoggedIn();

    this.api.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLogIn = this.api.isLoggedIn();
    });
  }

  public logout() {
    this.api.logout();
    window.location.reload();
  }
}
