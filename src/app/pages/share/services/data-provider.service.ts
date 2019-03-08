import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

export interface UserInterface {
  ref: string,
  id: string;
  email: string;
  name: string;
  last_name: string;
  role: string;
  organization: string;
  created: string;
  updated: string;
}

export interface OrganizationInterface {
  ref: string,
  id: string;
  name: string;
  description: string;
  address: string;
  created: string;
  updated: string;
}

export interface Ticket{
  ref:string,
  title:string,
  observation:string,
  state:string,
  created:string
  updated:string
}

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private getUserRoute(){
    return this.afStore.collection('users');
  }

  private getOrganizationRoute(){
    return this.afStore.collection("organizations")
  }

  private getTicketRoute(){
    return this.afStore.collection("tickes")
  }

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
  ) {

  }

  getUserInformationByEmail(email) {
    return this.getUserRoute().ref.where('email','==',email).get()
  }

  deleteUser(ref){
    this.getUserRoute().doc(ref).delete();
  }

  getUserList(){
    return this.afStore.collection('users').snapshotChanges().pipe(map((action) => action.map(_ => {
      return <any>{...{
        'ref': _.payload.doc.id,
        'id' : 0,
      },...(_.payload.doc.data())}
    })))
  }

  getUserPusher(){
    return this.getUserRoute();
  }
  

  getTicketList(organization){
    return this.getTicketRoute().doc(organization).collection('list').snapshotChanges().pipe(map((action) => action.map(_ => {
      return <any>{...{
        'ref': _.payload.doc.id,
        'id' : 0,
      },...( _.payload.doc.data() )}
    })));
  }

  getTicketByRef(organization,ref){
    return this.getTicketRoute().doc(organization).collection("list").doc(ref).valueChanges()
  }

  getTickePusher(organization){
    return this.getTicketRoute().doc(organization).collection("list")
  }
  
  deleteTicket(organization,ref){
    this.getTicketRoute().doc(organization).collection('list').doc(ref).delete();
  }

  getOrganizationList(){
    return this.getOrganizationRoute().snapshotChanges().pipe(map((action) => action.map(_ => {
      return <any>{...{
        'ref': _.payload.doc.id,
        'id' : 0,
      },...(_.payload.doc.data())}
    })))
  }

  getOrganizationPusher(){
    return this.getOrganizationRoute();
  }

  deleteOrganization(ref){
    this.getOrganizationRoute().doc(ref).delete();
  }

  uploadOrganizationImage(file){
    return this.afStorage.ref("organizations/logos/").put(file)
  }
}
