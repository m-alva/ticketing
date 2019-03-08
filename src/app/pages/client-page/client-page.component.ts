import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share/services/share.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../share/animations/animations';

@Component({
  selector: 'client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class ClientPageComponent implements OnInit {
  constructor(
    public share:ShareService,
  ) {
    document.getElementsByTagName("html")[0].classList.add("epage-admin");
  }

  ngOnInit() {
    document.getElementById("preloader").classList.remove("active");
  }

  ngOnDestroy() {
    document.getElementsByTagName("html")[0].classList.remove("epage-admin");
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
