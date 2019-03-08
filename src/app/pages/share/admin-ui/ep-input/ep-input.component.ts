import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ep-input',
  templateUrl: './ep-input.component.html',
  styleUrls: ['./ep-input.component.scss']
})
export class EpInputComponent implements OnInit {
  
  @Input('type') type;
  @Input('label') label;
  @Input('placeholder') placeholder;

  constructor() { }

  ngOnInit() {
  }

}
