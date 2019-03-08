import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CertPageComponent } from 'src/app/pages/share/dialogs/cert-page/cert-page.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  form:FormGroup = new FormGroup({
    identificacion: new FormControl(),
  });

  student;

  dataCourses: Observable<Array<any>>;
  coursesNoAvailables = false;

  selection = new SelectionModel<any>(true, []);
  
  private asyncLoad = false;
  private userIdentification;

  constructor(
    private _store: AngularFirestore,
    private _location: Location,
    private _dialog:MatDialog ,
    private route: ActivatedRoute,
  ) {
    this.userIdentification = <any>this.route.snapshot.paramMap.get('user');
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.asyncLoad = true;
  }

  ngAfterViewChecked(): void {
    if(this.asyncLoad){
      this.asyncLoad = false;
      
      this.dataCourses = new Observable<Array<any>>((subscriber)=>{
        this._store.collection("registros", (ref)=>{
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.where('identificacion', '==', this.userIdentification);
          return query;
        }).snapshotChanges().pipe(map((action) => action.map(_ => {
          return <any>{...{
            'ref': _.payload.doc.id,
            'id' : 0,
          },...( _.payload.doc.data() )}
        }))).subscribe((result)=>{
          console.log(result);
          subscriber.next(result)
          if(!result.length){
            this.coursesNoAvailables = true;
          }
        });
      })

      this._store.collection('estudiantes', (ref) => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('identificacion', '==', this.userIdentification);
        return query;
      }).snapshotChanges().pipe(map((action) => action.map(_ => {
        return <any>{...{
          'ref': _.payload.doc.id,
          'id' : 0,
        },...( _.payload.doc.data() )}
      }))).subscribe((result)=>{
        this.student = result[0];
      })
    }
  }

  openCertified(ref){
    this._dialog.open(CertPageComponent,{
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      data:{
        ref: ref
      }
    })
  }

  singleSelect(row) {
    this.selection.clear();
    this.selection.toggle(row)
  }

  backClicked() {
    this._location.back();
  }
}
