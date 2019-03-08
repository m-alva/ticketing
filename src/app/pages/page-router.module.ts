import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    template: `Otra Pagina`
})
export class ComponentMain {
}

const routes: Routes = [
    { path: '', loadChildren: "./admin-page/admin-page.component#AdminPageModule" },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations:[
        ComponentMain,
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class PageRouterModule {

}