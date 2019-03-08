import { NgModule } from '@angular/core';
import { CertPageComponent } from './cert-page.component';
import { AdminUiModule } from '../../admin-ui/admin-ui.module';

@NgModule({
    declarations: [
        CertPageComponent,
    ],
    imports: [ 
        AdminUiModule,
    ],
    exports: [
        CertPageComponent,
    ],
    entryComponents:[
        CertPageComponent,
    ],
    providers: [],
})
export class CertPageModule {

}