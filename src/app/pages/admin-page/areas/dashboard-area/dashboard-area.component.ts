import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataProviderService } from 'src/app/pages/share/services/data-provider.service';

@Component({
  selector: 'dashboard-area-data',
  templateUrl: './dashboard-area.component.html',
  styleUrls: ['./dashboard-area.component.scss']
})
export class DashboardAreaComponent implements OnInit {
  
  user:any = null;
  organizations;

  constructor(
    private afAuth: AngularFireAuth,
    private dataProvider: DataProviderService,
    private router: Router,
  ) {
    this.dataProvider.getUserInformationByEmail(this.afAuth.auth.currentUser.email).then(((value)=>{
      this.user = value.docs[0].data();
    }));
    this.dataProvider.getOrganizationList().subscribe((organizations)=>{
      this.organizations = organizations;
    });
  }

  ngOnInit() {

  }

  logOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
