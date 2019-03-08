import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { DataProviderService } from '../../services/data-provider.service';


@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  type: "new" | "edit";
  collectionRef: any;
  organization:string;

  mainform = new FormGroup({
    'title': new FormControl(""),
    'observation': new FormControl(""),
    'state': new FormControl(""),
  });

  constructor(
    private _ref: MatDialogRef<TicketFormComponent>,
    private dataProvider: DataProviderService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.type = data.type;
    this.collectionRef = data.ref;
    this.organization = data.organization;
    if(this.type == "edit" && this.collectionRef){
      this.dataProvider.getTicketByRef(this.organization,this.collectionRef).subscribe((values:any)=>{
        this.mainform.controls.title.setValue(values.title);
        this.mainform.controls.observation.setValue(values.observation);
        this.mainform.controls.state.setValue(values.state);
      })
    }
  }

  ngOnInit() {

  }

  save(){
    if(this.type == "new"){
      this.dataProvider.getTickePusher(this.organization).add({
        title: this.mainform.controls.title.value,
        observation: this.mainform.controls.observation.value,
        state: this.mainform.controls.state.value,
        created: (new Date()).toLocaleDateString("en-US"),
        updated: (new Date()).toLocaleDateString("en-US"),
      });
    }else if(this.type == "edit"){
      this.dataProvider.getTickePusher(this.organization).doc(this.collectionRef).set({
        title: this.mainform.controls.title.value,
        observation: this.mainform.controls.observation.value,
        state: this.mainform.controls.state.value,
        updated: (new Date()).toLocaleDateString("en-US"),
      });
    }
    this._ref.close();
  }
}
