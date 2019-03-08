import { NgModule } from '@angular/core';
import { ClientPageComponent } from './client-page.component';
import { ClientPageRoutingModule } from './router-module/cient-page-router.module';
import { AdminUiModule } from '../share/admin-ui/admin-ui.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DoomPortalPushModule } from '../share/directives/doom-portal-push.directive';
import { ShareModulesModule } from '../share/modules/share-modules.module';
import { CertPageModule } from '../share/dialogs/cert-page/cert-page.module';

@NgModule({
  declarations: [

    ClientPageComponent,
    HomePageComponent,
    UserPageComponent,
  ],
  imports: [
    ClientPageRoutingModule,

    CertPageModule,
    
    ShareModulesModule,
    
    AdminUiModule,
    
    DoomPortalPushModule,
  ],
  exports:[
    ClientPageComponent,
  ]
})
export class ClientPageModule { }
