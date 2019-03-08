import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';

import { slideInAnimation } from '../share/animations/animations';

import { AdminUiModule } from '../share/admin-ui/admin-ui.module';
import { LoginAreaComponent } from './areas/login-area/login-area.component';
import { ForgotAreaComponent } from './areas/forgot-area/forgot-area.component';
import { DashboardAreaComponent } from './areas/dashboard-area/dashboard-area.component';

import { ShareService } from '../share/services/share.service';

import { DoomPortalPushModule } from '../share/directives/doom-portal-push.directive' ;
import { OrganizationsAreaComponent } from './areas/organizations-area/organizations-area.component';
import { TicketsAreaComponent } from './areas/tickets-area/tickets-area.component';

import { UsersAreaComponent } from './areas/users-area/users-area.component';

import { UserFormModule } from '../share/dialogs/user-form/user-form.module';
import { TicketFormModule } from '../share/dialogs/ticket-form/ticket-form.module';
import { OrganizationFormModule } from '../share/dialogs/organization-form/organization-form.module';

import { ShareModulesModule } from '../share/modules/share-modules.module';
import { GuardRouteService, Permissions } from './permissions/guard-route.service';


@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AdminPageComponent implements OnInit {

  constructor(
    public share:ShareService,
  ) { 
  document.getElementsByTagName("html")[0].classList.add("epage-admin");
}

ngOnInit() {
  document.getElementById("preloader").classList.remove("active");
}

ngOnDestroy() {
  document.getElementsByTagName("html")[0].classList.remove("epage-admin");
}
  
prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

const routes: Routes = [
  { path: '', component: AdminPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login', component: LoginAreaComponent, data: {animation: 'Login'} },
      { path: 'forgot', component: ForgotAreaComponent },
      { path: 'dashboard', component: DashboardAreaComponent, data: {animation: 'DataAccess'}, canActivate: [GuardRouteService] },
      { path: 'organizations', component: OrganizationsAreaComponent, data: {animation: 'HomePage'}, canActivate: [GuardRouteService] },
      { path: 'tickets/:organization', component: TicketsAreaComponent, data: {animation: 'HomePage'}, canActivate: [GuardRouteService] },
      { path: 'users', component: UsersAreaComponent, canActivate: [GuardRouteService] },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}

@NgModule({
  declarations: [
    AdminPageComponent,

    DashboardAreaComponent,
    LoginAreaComponent,
    ForgotAreaComponent,
    UsersAreaComponent,
    OrganizationsAreaComponent,
    TicketsAreaComponent,

  ],
  imports: [
    AdminPageRoutingModule,

    ShareModulesModule,

    AdminUiModule,

    DoomPortalPushModule,

    UserFormModule,
    TicketFormModule,
    OrganizationFormModule,
  ],
  exports: [
    AdminPageComponent,
  ],
  providers: [
    ShareService,

    GuardRouteService,
    Permissions,
  ],
})
export class AdminPageModule {}