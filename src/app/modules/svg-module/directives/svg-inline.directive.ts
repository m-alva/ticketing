import { Directive, ElementRef, Input, Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[svgInline]'
})
export class SvgInlineDirective {
  private _value;

  @Output() svgLoaded:EventEmitter<void> = new EventEmitter();

  @Input()
  set svgInline(svg:string){
    this._value = svg;
    if(this.el){
      this.setSvg(svg);
    }
  }
  get svgInline() : string{
    return this._value;
  }

  constructor(
    private el: ElementRef<HTMLDivElement>
  ) {
  }

  setSvg(svg:string){
    var self = this;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", svg, true);
    ajax.send();
    ajax.onload = function(e) {
      let svgData = ajax.responseText;
      console.log("regex",RegExp("style").test(svgData));
      var array1;
      var regex =  RegExp('<g.*id=\"(.*?)\" ?','g');
      let names = new Array();
      while ((array1 = regex.exec(svgData)) !== null) {
        //console.log("regex",array1);
        //RegExp('<path.*class=\"(.*?)\" ?').exec(svgData)
        //console.log("regex",RegExp('\.(.*){').exec(svgData));
        names.push(array1[1]);
      }

      console.log(names.toString());
      

      self.el.nativeElement.insertAdjacentHTML("afterbegin",svgData);
      let child:SVGElement = <any>self.el.nativeElement.firstElementChild;
      child.onload = ()=>{
        self.svgLoaded.emit();
      }
    }
  }
  getValue() : string {
    return this._value;
  }
}
