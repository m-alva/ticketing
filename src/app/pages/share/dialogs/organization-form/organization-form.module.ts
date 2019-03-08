import { NgModule } from '@angular/core';
import { OrganizationFormComponent } from './organization-form.component';

import { AdminUiModule } from '../../admin-ui/admin-ui.module';

@NgModule({
  declarations: [
    OrganizationFormComponent
  ],
  imports: [    
    AdminUiModule,
  ],
  entryComponents:[
    OrganizationFormComponent,
  ]
})
export class OrganizationFormModule { }
