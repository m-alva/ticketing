import { Directive, ElementRef, Input } from '@angular/core';

declare var Chart:any;

@Directive({
  selector: '[charjsCanvas]'
})
export class CharjsCanvasDirective {

  @Input() charjsCanvas:any;
  @Input() type:string;
  @Input() data:any;

  private ctx;
  private myChart;

  constructor(
    private el:ElementRef<HTMLCanvasElement>
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.charjsCanvas,this.type,this.data);
    
    this.ctx = this.el.nativeElement.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: this.type,
      data: this.data,
      options: this.charjsCanvas
    });
  }
}
