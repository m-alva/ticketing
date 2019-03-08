import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShareService } from 'src/app/pages/share/services/share.service';

@Component({
  selector: 'admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminTemplateComponent implements OnInit {

  constructor(
    private share: ShareService
  ) { 
    share.currentTemplate = "admin";
  }

  ngOnInit() {
  }

}
