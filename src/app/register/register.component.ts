import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Client }  from '../client';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {
 
   curAddress : string;
   
   companyName : string;
   email       : string;
   phone       : string;  
   screenWidth:number;

   submitted = false;

   newClient : Client;

   constructor( 
                private activatedRoute: ActivatedRoute,
                private authService: AuthenticationService,
                private ngZone: NgZone,
                private router: Router,
                private spinnerService: Ng4LoadingSpinnerService) { 
                   this.screenWidth = window.innerWidth;
                  window.onresize = () => {
                    // set screenWidth on screen size change
                    this.screenWidth = window.innerWidth;
                  };
                }

   ngOnInit() {

        this.activatedRoute.params.subscribe((params: any) => {


            this.email = params.email;
            this.companyName = params.companyName;
            this.phone = params.phoneNumber;
         
            this.newClient = new Client(0,"","",this.email,
              "",this.phone,"","","","",this.companyName,"");
         
 
 	 });


       
             let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {

                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    this.curAddress = place.formatted_address;

                   if( place.geometry === undefined || place.geometry === null ) {
                        return;
                   }
               });
             });
    
   }



   @ViewChild('search') public searchElement: ElementRef;
   
   registerClient(form : NgForm) {

        this.spinnerService.show();

   	this.submitted = true;

       // form.value.address = this.curAddress;  
 
   	//console.log("Creating new client: " + JSON.stringify(form.value));
  
        this.authService.addClient(JSON.stringify(form.value)).subscribe( data => {

                  this.spinnerService.hide();
                  alert("Please login to your email to complete the registration process. If you still have questions, please contact info@secuur.co for technical assistance.");

                  this.router.navigate(['/login']);

           },err=>{
               this.spinnerService.hide();
               console.log(err);
               alert("We could not register you at this moment, please try again or contact us for further queries.");

           }
        );
   
        //this.spinnerService.hide();

        //this.router.navigate(['/login']);

        /*
   	this.authService.addClient(JSON.stringify(form.value)).subscribe( data =>  {

                this.router.navigate(['/login']);

                this.spinnerService.hide();

             }

        );*/


  }


  login() {

    this.router.navigate(['/login']);

 }

}
