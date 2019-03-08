import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from 'src/environments/environment';

interface IMessage {
  name: string,
  email: string,
  message: string
};

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  public storeMessage(data:IMessage){
    return this.http.post(environment.content.apiUrl + "message",data);
  }

}