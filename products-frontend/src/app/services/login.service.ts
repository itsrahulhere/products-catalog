import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public getCurrentUser() {
    return this.http.get(`http://localhost:9001/current-user`);
  }

  public generateToken(UserLoginData: any) {
    console.log(UserLoginData);
    return this.http.post(`http://localhost:9001/token`, UserLoginData);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    this.loginStatusSubject.next(true);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

}
