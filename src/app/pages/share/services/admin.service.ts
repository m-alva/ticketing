import { Injectable } from '@angular/core';
import { AuthRequestService } from './auth-request.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private auth:AuthRequestService
  ) { 

  }

  updateInformation(
    names:string,
    last_names:string,
    phones:string,
    address:string,
    country:string,
    city:string
  ){
    return new Observable<void>((subscriber)=>{
      this.auth.post(environment.content.apiUrl+"user/information",{
        'names': names,
        'last_names': last_names,
        'phones': phones,
        'address': address,
        'country': country,
        'city': city
      }).subscribe((result)=>{
        subscriber.next();
      },(error)=>{
        subscriber.error();
        //handle error here, replace subscriber.next by retry
      });
    })
  }
}
