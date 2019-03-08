import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProviderService } from '../../services/data-provider.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  type: "new" | "edit";
  collectionRef: any;
  oneNext = false;
  organizations;

  mainform = new FormGroup({
    'email': new FormControl(""),
    'password': new FormControl(""),
    'name': new FormControl(""),
    'last_name': new FormControl(""),
    'role': new FormControl(""),
    'organization': new FormControl(""),
  });

  constructor(
    private _ref: MatDialogRef<UserFormComponent>,
    private dataProvider: DataProviderService,
    private login: LoginService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.type = data.type;
    this.collectionRef = data.ref;
    if(this.type == "edit" && this.collectionRef){
      this.dataProvider.getUserPusher().doc(this.collectionRef).valueChanges().subscribe((values:any)=>{
        this.mainform.controls.email.setValue(values.email);
        this.mainform.controls.name.setValue(values.name);
        this.mainform.controls.last_name.setValue(values.last_name);
        this.mainform.controls.role.setValue(values.role);
        this.mainform.controls.organization.setValue(values.organization);
      })
    }
    this.dataProvider.getOrganizationList().subscribe((organizations)=>{
      this.organizations = organizations;
    })
  }

  ngOnInit() {
  }

  nextEnable() {
    if(this.type == "new" && !this.collectionRef) {
      return true;
    }
    return false;
  }

  next(){
    if(this.oneNext){
      return false;
    }
    this.login.createLoginUser({
      email: this.mainform.controls.email.value,
      password: this.mainform.controls.password.value
    }).then((userCredential)=>{
      this.dataProvider.getUserPusher().add({
        email: userCredential.user.email
      }).then((userRef)=>{
        this.dataProvider.getUserInformationByEmail(userCredential.user.email).then((user)=>{
          this.collectionRef = user.docs[0].ref.id;
          this.type = "edit";
          this.oneNext = true;
        })
      })
    }).catch((reason)=>{
      console.log(reason);
      if(reason.code == "auth/email-already-in-use"){
        this.dataProvider.getUserPusher().add({
          email: this.mainform.controls.email.value
        }).then((userRef)=>{
          this.dataProvider.getUserInformationByEmail(this.mainform.controls.email.value).then((user)=>{
            this.collectionRef = user.docs[0].ref.id;
            this.type = "edit";
            this.oneNext = true;
          })
        })
      }
    })
  }

  save(){
    if(this.type == "new"){
      this.dataProvider.getUserPusher().add({
        email: this.mainform.controls.email.value,
        name: this.mainform.controls.name.value,
        last_name: this.mainform.controls.last_name.value,
        role: this.mainform.controls.role.value,
        organization: this.mainform.controls.organization.value,
        created: (new Date()).toLocaleDateString("en-US")
      });
    }else if(this.type == "edit"){
      this.dataProvider.getUserPusher().doc(this.collectionRef).set({
        email: this.mainform.controls.email.value,
        name: this.mainform.controls.name.value,
        last_name: this.mainform.controls.last_name.value,
        role: this.mainform.controls.role.value,
        organization: this.mainform.controls.organization.value,
        created: (new Date()).toLocaleDateString("en-US"),
        update: (new Date()).toLocaleDateString("en-US"),
      });
    }
    this._ref.close();
  }
}
