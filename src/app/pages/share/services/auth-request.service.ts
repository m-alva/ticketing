import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { get as getCookie, set as setCookie } from "es-cookie";

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {

  private _token:string = "";

  get token(){
    if(this._token === ""){
      this._token = AuthRequestService.resolveToken();
    }
    return this._token
  }

  constructor(
    private http:HttpClient
  ) { 
  }

  post(url:string,payload:any) : Observable<any>{
    return this.http.post(url,payload,{
      headers: new HttpHeaders({
        'Authorization': "Bearer "+this.token
      })
    });
  }

  get(url:string) : Observable<any>{
    return this.http.get(url,{
      headers: new HttpHeaders({
        'Authorization': "Bearer "+this.token
      })
    });
  }

  setToken(token:string){
    this._token = token;
    setCookie('token',token);
  }

  static resolveToken() : string {
    let token = getCookie("token");
    if(token){
        return token;
    }
    return null;
  }
}
