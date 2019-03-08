import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export class Permissions {
  canActivate(user: firebase.User, id: string): boolean {
    return user ? true : false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GuardRouteService implements CanActivate {
  constructor(private router: Router,private permissions: Permissions, private afAuth: AngularFireAuth) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return new Observable<boolean>((subscriber)=>{
      this.afAuth.user.subscribe((user)=>{
        if(this.permissions.canActivate(user, route.params.id)){
          subscriber.next(true);
        }else{
          console.log("invalidate");
          subscriber.next(false);
        }
      })
    })
  }
}