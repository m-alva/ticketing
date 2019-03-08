import { Component, OnInit, Input, EventEmitter, Output, forwardRef, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ep-color',
  templateUrl: './ep-color.component.html',
  styleUrls: ['./ep-color.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EpColorComponent),
      multi: true,
    }
  ]
})
export class EpColorComponent implements OnInit, ControlValueAccessor {

  @Input('placeholder') _placeholder:string = "Place holder";
  @Input('value') value = "#ffffff";

  _onChange;
  _onTouched;
  _disableState;

  constructor(
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes.value && changes.value.currentValue != changes.value.previousValue){
      this._onChange(changes.value.currentValue);
    }
  }

  valueChanged($event){
    console.log($event,this.value);
    this._onChange(this.value);
  }

  registerOnChange(fn){
    this._onChange = fn;
  }

  writeValue(value) {
    this.value = value;
    this.cdr.detectChanges();
  }

  registerOnTouched(fn){
    this._onTouched = fn;
  }

  setDisabledState(fn){
    this._disableState = fn;
  }
}
