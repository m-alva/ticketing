import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form.component';

import { AdminUiModule } from '../../admin-ui/admin-ui.module';

@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [    
    AdminUiModule,
  ],
  entryComponents:[
    UserFormComponent,
  ]
})
export class UserFormModule { }
