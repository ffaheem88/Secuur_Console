import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Employee }  from '../employee';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  curAddress : string;
   
  
  email       : string;
  phone       : string;  

  allchecked = false;

  newEmployee : Employee;
  screenWidth:number;

  constructor( private activatedRoute: ActivatedRoute,
    private empService: EmployeeService,
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
    this.newEmployee = new Employee(0,"","",this.email,
    "",this.phone,this.curAddress,"");
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



  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length>0){
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () =>{
        this.newEmployee.profile_pic = 'data:'+file.type+';base64,'+reader.result.split(',')[1];
        console.log(this.newEmployee.profile_pic);
      }
    }
  }
  
   registerClient(form : NgForm) {
    


        form.value.address = this.curAddress;  
        form.value.profile_pic = this.newEmployee.profile_pic;
        if(form.value.profile_pic.length>0 ){
        this.spinnerService.show();
        this.empService.addEmployee(JSON.stringify(form.value)).subscribe( data => {

                  this.spinnerService.hide();
                  this.router.navigate(['/employee']);

           }, err => {
            this.spinnerService.hide();
           alert("Employee already exists on system.")
          });
        
      }
   


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

  

  settings() {

    this.router.navigate(['/settings']);

  }

}
