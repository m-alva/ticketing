import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { AngularFirestore } from '@angular/fire/firestore';

declare var swal:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  form:FormGroup = new FormGroup({
    identificacion: new FormControl(),
  });

  constructor(
      private _location: Location,
      private _router: Router,
      private _store: AngularFirestore,
  ) {

  }

  ngOnInit() {
    
  }

  verificar(){
    if(this.form.valid){
      this._store.collection('estudiantes',(ref)=>{
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('identificacion', '==', this.form.controls.identificacion.value);
        return query;
      }).valueChanges().subscribe((result)=>{
        if(result.length){
          this._router.navigate(['/usuario/'+this.form.controls.identificacion.value]);
        }else{
          swal.fire({
            title: "Error", 
            text:"No existen registros en la base de datos para esta identificación",
            type:"error"
          });
        }
      })
    }
  }

  backClicked() {
    this._location.back();
  }
}
