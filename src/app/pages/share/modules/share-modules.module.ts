import { NgModule } from '@angular/core';
import { CountToModule } from 'angular-count-to';
import { OwlCarouselModule } from '../../../modules/owl-carousel/owl-carousel.module';
import { AdminTemplateComponent } from '../../admin-page/templates/admin-template/admin-template.component';
import { BackgroundTemplateComponent } from '../../admin-page/templates/background-template/background-template.component';

@NgModule({
    declarations: [
        AdminTemplateComponent,
        BackgroundTemplateComponent,
    ],
    imports: [
   
        CountToModule,
    
        OwlCarouselModule,
     ],
    exports: [
        AdminTemplateComponent,
        BackgroundTemplateComponent,
        
        CountToModule,
    
        OwlCarouselModule,
    ],
    providers: [],
})
export class ShareModulesModule {}