import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http:HttpClient) { }

  postUser(data:any) {
    return this._http.post<any>("http://localhost:9001/users/", data).pipe(map((res:any)=>{
      return res;
    }))
  } 

  getOneUser(email:string) {
    return this._http.get<any>("http://localhost:9001/users/" + email).pipe(map((res:any)=>{
      return res;
    }))
  } 

  updateUser(data:any) {
    return this._http.put<any>("http://localhost:9001/users/", data).pipe(map((res:any)=>{
      return res;
    }))
  } 

  deleteUser(email:string) {
    return this._http.delete<any>("http://localhost:9001/users/" + email).pipe(map((res:any)=>{
      return res;
    }))
  } 
}
