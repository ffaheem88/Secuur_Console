import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import { Employee }  from '../employee';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { EmployeeService }  from '../employee.service';
import { BookJobRequest } from '../bookjobrequest'; 
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Pipe, PipeTransform} from '@angular/core';
import { MatAutocompleteSelectedEvent, MatInput } from '@angular/material';
import * as moment from 'moment';


declare var google: any;

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit, PipeTransform {




  hours = [
  { name: "4" },
  { name: "5" },
  { name: "6" },
  { name: "7" },
  { name: "8" },
  { name: "9" },
  { name: "10" },
  { name: "11" },
  { name: "12" },
  { name: "13" },
  { name: "14" },
  { name: "15" },
  { name: "16" },
  { name: "17" },
  { name: "18" },
  { name: "19" },
  { name: "20" },
  { name: "21" },
  { name: "22" },
  { name: "23" },
  { name: "24" }
];

visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  Available: Employee[] = [];
  
  
   Assigned: Employee[] = [];

  curStartTime : string;
  curEndTime : string;
  curAddress : string;
  curInstructions : string;
  curLat : number =  33.7490;
  curLng : number = -84.3880;
  curPlaceType : string[];

  /*date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'MM-dd-yyyy hh:mm a',
        defaultOpen: false,
        closeOnSelect: false
    };
   */


  total:number=0;
  rate:number=0.25;

  screenWidth:number;

  curAuthToken : string;

  newJob = new BookJobRequest("","","",4,"","","");

  @ViewChild('search') public searchElement: ElementRef;

  
  constructor(
              private ngZone: NgZone, 
              private jobService: JobService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
            private empService:EmployeeService) {

     	     this.curAuthToken = localStorage.getItem("token");
            this.screenWidth = window.innerWidth;
            window.onresize = () => {
              // set screenWidth on screen size change
              this.screenWidth = window.innerWidth;
            };
             this.curPlaceType = new Array();
             this.curPlaceType[0] = "establishment";

  }


  addNew(event: MatAutocompleteSelectedEvent): void {
    
    let value = event.option.value;

    
   
      this.Assigned.push(value);
      let index = this.Available.indexOf(value);

      if (index >= 0) {
        this.Available.splice(index, 1);
      }
   
   
}

getEmployees(){

  console.log(this.newJob.startDate);
  if(this.newJob.startDate!=null){

  this.spinnerService.show();
  this.newJob.address = this.curAddress;
  var newStartTime = new Date(Date.parse(moment(this.newJob.startDate).format()));
  var newEndTime = new Date(newStartTime.getTime() + (this.newJob.duration*60*60*1000)).toISOString()

  


 
 let body = {
      "address"    : this.curAddress,
      "duration"   : this.newJob.duration,
      "endTime"    : newEndTime,
      "instructions" : this.curInstructions,
      "lat" : this.curLat,
      "lng" : this.curLng,
      "numberOfGuards" : this.Assigned.length, 
      "assignedGuards" : this.Assigned,
      "startTime" :  newStartTime,
      "type" : this.newJob.type,
      "time" : new Date().toISOString()
   };    


  console.log("Creating job: " + JSON.stringify(body));

  this.empService.getAvailableEmployees(JSON.stringify(body)).subscribe( data=> {
    console.log(data);
    this.Available = data;
    this.spinnerService.hide();
    this.Assigned =[];
  },
        
    err => {
      this.spinnerService.hide();
      this.Assigned =[];

         console.log("Problemgetting emplopyees: "+err);
        
    },
    () => {
     
       

        this.spinnerService.hide();

    });
 
  }
}
  

  remove(guard: any): void {
    let index = this.Assigned.indexOf(guard);
    this.Available.push(this.Assigned[index]);
    if (index >= 0) {
      this.Assigned.splice(index, 1);
    }
    


  }

  ngOnInit() {

    if( this.curAuthToken == "" ) {

       this.router.navigate(['/login']);
    
    }
    else {
    
	
             let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {
                   
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    this.curAddress = place.formatted_address; 
	 	    this.curPlaceType = place.types;
                    this.curLat = place.geometry.location.lat();
                    this.curLng = place.geometry.location.lng();

                   if( place.geometry === undefined || place.geometry === null ) {
                        return;
                   }
               });
             });
         }

     }

  

  transform(date) {
    return moment(date).format();
  }

  
  addJob( newJob: NgForm ) : void {

    this.spinnerService.show();
    
    var newStartTime = new Date(Date.parse(moment(newJob.value.startDate).format()));
    var newEndTime = new Date(newStartTime.getTime() + (newJob.value.duration*60*60*1000)).toISOString()

    

    if( newJob.value.instructions == undefined ) {
          this.curInstructions = "";
    }
    else {
      this.curInstructions = newJob.value.instructions;
    }

   
   let body = {
        "address"    : this.curAddress,
        "duration"   : newJob.value.duration,
        "endTime"    : newEndTime,
        "instructions" : this.curInstructions,
        "lat" : this.curLat,
        "lng" : this.curLng,
        "numberOfGuards" : this.Assigned.length, 
        "assignedGuards" : this.Assigned,
        "startTime" :  newStartTime,
        "type" : newJob.value.type,
        "time" : new Date().toISOString()
     };    

  
    console.log("Creating job: " + JSON.stringify(body));
  
    

    this.jobService.addJob(JSON.stringify(body)).subscribe( data => status = data, 
        
        err => {
             alert("We could not book your  job at this moment, please try again");
             console.log("Problem creating job: "+err);
             //this.router.navigate(['/bookedjobs']);
        },
        () => {
         
            this.router.navigate(['/bookedjobs']);

            this.spinnerService.hide();

        });
    
         
  }


   logout() : void {

      localStorage.setItem("token","");
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

   settings() {

     this.router.navigate(['/settings']);

   }


}
