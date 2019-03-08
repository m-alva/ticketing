import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientPageComponent } from '../client-page.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { UserPageComponent } from '../pages/user-page/user-page.component';

const routes: Routes = [
  { path: '',  component: ClientPageComponent,
    children: [
      { path: '', pathMatch: "full" , redirectTo: 'verificar' },
      { path: 'verificar', component: HomePageComponent },
      { path: 'usuario/:user', component: UserPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPageRoutingModule {}