import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProviderService } from '../../services/data-provider.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {

  type: "new" | "edit";
  collectionRef: any;

  formulario = new FormGroup({
    'name': new FormControl(""),
    'description': new FormControl(""),
    'address': new FormControl(""),
    'organization_color': new FormControl(""),
    'image': new FormControl(""),
  });

  constructor(
    private _ref: MatDialogRef<OrganizationFormComponent>,
    private dataProvider: DataProviderService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.type = data.type;
    this.collectionRef = data.ref;
    if(this.type == "edit" && this.collectionRef){
      
      this.dataProvider.getOrganizationPusher().doc(this.collectionRef).valueChanges().subscribe((values:any)=>{
        this.formulario.controls.name.setValue(values.name);
        this.formulario.controls.description.setValue(values.description);
        this.formulario.controls.address.setValue(values.address);
        this.formulario.controls.organization_color.setValue(values.organization_color);
        this.formulario.controls.image.setValue(values.image);
      })
    }
  }

  ngOnInit() {
  }

  save(){
    if(this.type == "new"){
      this.dataProvider.getOrganizationPusher().add({
        name: this.formulario.controls.name.value,
        description: this.formulario.controls.description.value,
        address: this.formulario.controls.address.value,
        image: this.formulario.controls.image.value,
        organization_color: this.formulario.controls.organization_color.value,
        created: (new Date()).toLocaleDateString("en-US"),
      });
    }else if(this.type == "edit"){
      this.dataProvider.getOrganizationPusher().doc(this.collectionRef).set({
        name: this.formulario.controls.name.value,
        description: this.formulario.controls.description.value,
        address: this.formulario.controls.address.value,
        image: this.formulario.controls.image.value,
        organization_color: this.formulario.controls.organization_color.value,
        created: (new Date()).toLocaleDateString("en-US"),
      });
    }
    this._ref.close();
  }
}
