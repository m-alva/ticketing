import { Directive, Input, ElementRef } from '@angular/core';

declare var $:any;

@Directive({
  selector: '[owlCarousel]',
  exportAs: 'owlCarousel',
})
export class OwlCarouselDirective {
  private _initialice = false;
  private _owlCarousel;
  @Input() 
  set owlCarousel(v){
    this._owlCarousel = v;
    if(this._initialice){
      this.reinit(v);
    }
  }
  get owlCarousel(){
    return this._owlCarousel;
  }
  @Input() autoStart:boolean = true;

  private ref:any;

  constructor(
    private el:ElementRef<HTMLElement>
  ) { 
    window['owl'] = this;
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(this.autoStart){
      this.start();
    }
  }

  start(){
    console.log("owlStart");
    //this.ref = $(this.el.nativeElement).owlCarousel(this.owlCarousel);
  }

  reset(){
    //$(this.el.nativeElement).trigger('destroy.owl.carousel');
  }

  reinit(options){
    console.log("owlReinit",options);
    //this.ref.owlCarousel('update');
  }
}
