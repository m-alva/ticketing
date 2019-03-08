import { NgModule } from '@angular/core';
import { TicketFormComponent } from './ticket-form.component';
import { AdminUiModule } from '../../admin-ui/admin-ui.module';

@NgModule({
  declarations: [
    TicketFormComponent,
  ],
  imports: [
    AdminUiModule,
  ],
  entryComponents:[
    TicketFormComponent,
  ]
})
export class TicketFormModule { }
