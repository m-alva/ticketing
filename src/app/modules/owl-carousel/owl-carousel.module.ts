import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlCarouselDirective } from './directives/owl-carousel.directive';


@NgModule({
    declarations: [
        OwlCarouselDirective,
    ],
    imports: [ CommonModule ],
    exports: [
        OwlCarouselDirective,
    ],
    providers: [],
})
export class OwlCarouselModule {}