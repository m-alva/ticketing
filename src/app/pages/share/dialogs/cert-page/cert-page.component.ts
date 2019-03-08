import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cert-page',
  templateUrl: './cert-page.component.html',
  styleUrls: ['./cert-page.component.scss']
})
export class CertPageComponent implements OnInit {

  cert;
  certRef;

  private asyncLoad = false;

  constructor(
    private _store: AngularFirestore,
    private _location: Location,
    private route: ActivatedRoute,
    private ref: MatDialogRef<CertPageComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    //this.certRef = this.route.snapshot.paramMap.get("cert");
    this.certRef = data.ref;
    console.log(this.certRef);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.asyncLoad = true;
  }

  ngAfterViewChecked(): void {
    if(this.asyncLoad) {
      this.asyncLoad = false;
      
      this._store.collection("registros").doc(this.certRef).valueChanges().subscribe((ref) => {
        console.log(ref);
        this.cert = ref;
      })
    }
  }

  format(d) {
    try{
      var date = new Date(d);
    }catch(e){
      console.log(e);
      return ""
    }
    return date.toLocaleDateString("es-ES",{day: 'numeric', month: 'long', year: 'numeric'})
  }

  close(){
    window.print();
  }

  backClicked() {
    this._location.back();
  }

}
