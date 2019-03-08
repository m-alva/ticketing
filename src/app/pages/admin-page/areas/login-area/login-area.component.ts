import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/share/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {  FormControl,  FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.scss']
})
export class LoginAreaComponent implements OnInit {

  userSubscription:Subscription;

  form:FormGroup = new FormGroup({
    user: new FormControl(environment.devData.user),
    password: new FormControl(environment.devData.password)
  });

  private returnUrl:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService:LoginService
  ) { 
    this.returnUrl = this.route.snapshot.queryParams['return'];
  }

  ngOnInit() {
  }

  logIn(){
    if(this.form.valid){
      this.userSubscription = this.loginService.validateUser(
        this.form.controls.user.value,
        this.form.controls.password.value).subscribe((user)=>{
        if(user != null){
          console.log("route",this.returnUrl);
          console.log('user',user);
          if(user){
            this.router.navigate(['/dashboard']);
          }
        }else{
          alert("");
        }
      },(error)=>{
        console.log(error);
        this.unsubscribeUser();
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeUser();
  }

  unsubscribeUser(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
