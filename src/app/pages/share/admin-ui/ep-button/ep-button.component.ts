import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ep-button',
  templateUrl: './ep-button.component.html',
  styleUrls: ['./ep-button.component.scss']
})
export class EpButtonComponent implements OnInit {

  @Input('type') type = "button";

  constructor() { }

  ngOnInit() {
  }

}
