import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShareService } from 'src/app/pages/share/services/share.service';

@Component({
  selector: 'background-template',
  templateUrl: './background-template.component.html',
  styleUrls: ['./background-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BackgroundTemplateComponent implements OnInit {

  constructor(
    private share: ShareService
  ) { 
    share.currentTemplate = "background";
  }

  ngOnInit() {
  }

}
