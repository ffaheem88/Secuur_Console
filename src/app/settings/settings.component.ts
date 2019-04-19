import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  curClient : Client;
  screenWidth:number;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
   }

  ngOnInit() {
     this.getClientInfo();
  }


   getClientInfo() : void  {


     let credentials  = {
           "email"    :   localStorage.getItem("email"),
           "password"   : localStorage.getItem("password"),
     };

     
      this.authService.loginClient(JSON.stringify(credentials))
          .subscribe(client => 
           {

               this.curClient = client;

               var response = JSON.stringify(this.curClient);
               var jsonResponseObj = JSON.parse(response);

               console.log("Client Found: " + response);


           }

       );
      

  }

  logout(): void {

    localStorage.setItem("token", "");
    this.router.navigate(['/login']);

  }

  home() {

    this.router.navigate(['/bookedjobs']);

  }

  payments() {

    this.router.navigate(['/payment']);

  }

  addjob() {

    this.router.navigate(['/addjob']);

  }

  sticker() {

    this.router.navigate(['/sticker']);

  }
  employee() {

    this.router.navigate(['/employee']);

  }
  settings() {

    this.router.navigate(['/settings']);

  }



}
