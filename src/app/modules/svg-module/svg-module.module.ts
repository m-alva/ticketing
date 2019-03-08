import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UseSvgDirective } from "./directives/use-svg.directive";
import { SvgInlineDirective } from "./directives/svg-inline.directive";

@NgModule({
    declarations: [
      UseSvgDirective,
      SvgInlineDirective,
    ],
    imports: [ CommonModule ],
    exports: [
      UseSvgDirective,
      SvgInlineDirective,
    ],
    providers: [],
  })
  export class UseSvgModule {}