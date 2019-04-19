import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import { ClientLoginRequest } from '../clientLoginRequest';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  screenWidth:number;
  emailsent:boolean = false;
  constructor(private authenticationService: AuthenticationService, 
              private router: Router,private spinnerService: Ng4LoadingSpinnerService) {


                this.screenWidth = window.innerWidth;
                window.onresize = () => {
                  // set screenWidth on screen size change
                  this.screenWidth = window.innerWidth;
                };
              }
              clientLoginRequest = new ClientLoginRequest("","");
  ngOnInit() {

    //TODO verify token, then pre-populate input fields
    if ( localStorage.getItem("token") != "" ) {
          //this.router.navigate(['/bookedjobs']);
    }
    else {
     // user must log in
    }

  }
  login() {

    this.router.navigate(['/login']);

 }

  forgotPassword(newForm: NgForm) : void  {
this.spinnerService.show();
      this.authenticationService.forgotPassword(JSON.stringify(newForm.value))
          .subscribe(clients =>        
           { 
             this.spinnerService.hide();
               var response = JSON.stringify(clients);
               var jsonResponseObj = JSON.parse(response); 
        
               console.log(jsonResponseObj);

            this.emailsent=true;

             
           },err=>{
            this.spinnerService.hide();
            alert("Email not found");
           }
      
       );
      

  }
  register(){
    this.router.navigate(['/register']);
  }

}
