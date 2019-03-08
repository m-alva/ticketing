import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharjsCanvasDirective } from './directives/charjs-canvas.directive';

@NgModule({
    declarations: [
        CharjsCanvasDirective,
    ],
    imports: [ CommonModule ],
    exports: [
        CharjsCanvasDirective,
    ],
    providers: [],
})
export class CharJsModule {}