import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientLoginRequest } from '../clientLoginRequest';
import { ClientPreRegisterRequest } from '../clientPreRegisterRequest';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Client } from '../client';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
 

  clientLoginRequest = new ClientLoginRequest("","");
  clientPreRegisterRequest = new ClientPreRegisterRequest("","","");

  constructor(private authenticationService: AuthenticationService, 
              private router: Router) {}

  ngOnInit() {

    //TODO verify token, then pre-populate input fields
    if ( localStorage.getItem("token") != "" ) {
          //this.router.navigate(['/bookedjobs']);
    }
    else {
     // user must log in
    }

  }


  login(newForm: NgForm) : void  {

      localStorage.setItem("email",newForm.value.email);
      localStorage.setItem("password",newForm.value.password);
      
      this.authenticationService.loginClient(JSON.stringify(newForm.value))
          .subscribe(clients =>        
           { 
               var response = JSON.stringify(clients);
               var jsonResponseObj = JSON.parse(response); 
        
               console.log(jsonResponseObj);
 
               localStorage.setItem("token",jsonResponseObj.token); 
               localStorage.setItem("id",jsonResponseObj.id);
               //just testing
               this.router.navigate(['/bookedjobs']);

              //  if ( localStorage.getItem("token").length >0 ) {
              //     this.router.navigate(['/bookedjobs']);
              //  }
              //  else  {
              //   //TODO handle failed authentication case
               
              //  }
           },err=>{
             if(err.status==403){
            alert("Incorrect password, please try again");
             }else if(err.status==404){
              alert("This email does not exist, please register");
             }
            console.log(err);
           }
      
       );
      

  }

  forgotPassword(){
    this.router.navigate(['/forgotpassword']);
  }
  register(){
    this.router.navigate(['/register']);
  }


}
