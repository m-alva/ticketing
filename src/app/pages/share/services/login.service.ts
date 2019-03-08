import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private _user:firebase.User = null;

  get user() : Observable<firebase.User> {
    return new Observable<firebase.User>((subscriber)=>{
      if(this._user){ //cache user
        subscriber.next(this._user);
      }
      //get user
    });
  }
  
  constructor(
    private http:HttpClient,
    private afAuth: AngularFireAuth,
  ) {
  }

  validateUser(user:string,password:string) : Observable<firebase.User> {
    return new Observable<firebase.User>((subscriber)=>{
      console.log("try user login");
      this.afAuth.auth.setPersistence("session").then(()=>{
        this.afAuth.auth.signInWithEmailAndPassword(user,password).then((user)=>{
          subscriber.next(this.afAuth.auth.currentUser);
        }).catch((e)=>{
          console.log(e);
        })
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
      });;
    })
  }

  updateAccess(
    user:string,
    email:string,
    password:string,
    confirmPassword:string,
  ){
    return new Observable<boolean>((subscriber)=>{
    });
  }

  createLoginUser(user:any) {
    var secondaryApp = firebase.initializeApp(environment.firebaseConfig, "Secondary");
    return secondaryApp.auth().app.auth().createUserAndRetrieveDataWithEmailAndPassword(
      user.email,
      user.password
      )
  }
  

  isLogged() : boolean {
    return this.user ? true : false;
  }  
}
