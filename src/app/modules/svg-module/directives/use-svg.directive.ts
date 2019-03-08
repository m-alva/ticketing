import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[useSvg]'
})
export class UseSvgDirective {
  private _value:string

  @Input()
  set useSvg(svg:string){
    this._value = svg;
    if(this.el){
      this.setSvg(svg);
    }
  }
  get useSvg() : string{
    return this._value;
  }

  constructor(
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setSvg(this._value);
  }

  setSvg(svg:string){
    let el:HTMLDivElement = this.el.nativeElement;
    let clone = document.createElement("div");
    clone.insertAdjacentHTML("afterbegin","<svg><use xlink:href=\""+svg+"\"></use></svg>");
    el.innerHTML = clone.firstElementChild.innerHTML;
    el.classList.add("icon-svg");
    let ref = document.getElementById(svg);
    if(ref){
      el.setAttribute("viewBox",ref.getAttribute("viewBox"));
    }
  }
  getValue() : string{
    return this._value;
  }
}