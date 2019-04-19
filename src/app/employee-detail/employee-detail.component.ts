import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {} from '@types/googlemaps';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PageEvent } from '@angular/material';
import { Employee }  from '../employee';
import {EmployeeService} from '../employee.service'
import * as moment from 'moment';
import { BookedJob } from '../bookedjob';


declare var google: any;
declare var RichMarker: any;

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {

  emp:Employee;
 
  map: any;


  EmployeeJobs: BookedJob[];

  dataSource = new MatTableDataSource<BookedJob>();

  displayedColumns = ['address', 'startTime', 'assignedGuards','jobstatus','details'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('map') mapElement: ElementRef;
  
  screenWidth:number;


  myToken = '';

  emptyJobs = false;

  constructor(private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private empService: EmployeeService
    ) {

    this.myToken = localStorage.getItem("token");
    this.emp = new Employee(0,"","","","","","","");
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
    // /this.emp= JSON.parse(localStorage.getItem("emp"));

  }

//   initMap(){
    
//     let mylocation = new google.maps.LatLng(33.774235,-84.385293);
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       zoom: 18,
//           center: mylocation,
//           backgroundColor: '#ffffff',
//           clickableIcons: false,
//           disableDoubleClickZoom: true,
//           mapTypeControl: true,
//           mapTypeId: 'roadmap',
//           mapTypeControlOptions: {
//             style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
//             position: google.maps.ControlPosition.TOP_CENTER
//           },
//           streetViewControl: false,
//           streetViewControlOptions: {
//             position: google.maps.ControlPosition.TOP_CENTER
//           },
//           zoomControl: false,
//           scaleControl: false,
//           fullscreenControl: false,
//           rotateControl: false
//         });
      
// } ;




  ngOnInit() {
    this.emp = this.router.getNavigatedData();
    console.log((this.emp)); 
    
    if(JSON.stringify(this.emp) === '{}' || !this.emp){
   
    this.emp = JSON.parse(localStorage.getItem("emp"));
    }else{
      localStorage.setItem("emp",JSON.stringify(this.emp));
    }
     
    
   
  }


  deleteEmployee(){
    this.spinnerService.show();
    this.empService.deleteEmployee(JSON.stringify(this.emp)).subscribe(data=>{
      this.employee();
      this.spinnerService.hide();
    },err=>{
      console.log(err);
      this.spinnerService.hide();
    }) ;
  }

  ngAfterViewInit() {
    // this.initMap();
    this.getClientJobs();
  }

  
  getClientJobs() {


    this.empService.getEmployeeJobs(JSON.stringify(this.emp)).subscribe(data => {
      console.log(data);

      var jsonResponseString = JSON.stringify(data);

      var jsonResponseArray = JSON.parse(jsonResponseString);
      
      var formattedJobs = new Array();

      var d: number;

      if (jsonResponseArray != null) {
        this.emptyJobs = false;

        for (d = 0; d < jsonResponseArray.length; d++) {
          jsonResponseArray[d].startTime = new Date(jsonResponseArray[d].startTime);
          jsonResponseArray[d].endTime = new Date(jsonResponseArray[d].endTime);

          let jobstatus = 0;
          let statusdes ='';
          let now = moment();
          let endTime = moment(jsonResponseArray[d].endTime,'hour');
          let minDiff = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(now, "HH:mm:ss"))).format("HH:mm");
          let startTime = moment(jsonResponseArray[d].startTime,'hour');
      
           let start = jsonResponseArray[d].startTime.getTime();
           let end =   jsonResponseArray[d].endTime.getTime();
           let rightnow =  new Date().getTime();
           let diffStart = start - rightnow;
           let diffEnd = end - rightnow;
          //  let isEmpty = true;
          //  if(jsonResponseArray[d].assignedGuards.length>0){
          //    isEmpty = false;
          //  }
           if(diffStart<1 && diffEnd>1){
             jobstatus=2;
             statusdes = 'Active';//Job will end '+ endTime.fromNow()'';
             jsonResponseArray[d].jobstatus=jobstatus;
             jsonResponseArray[d].statusdes=statusdes;
             formattedJobs.push(jsonResponseArray[d]);
           }

        } 
        for (d = 0; d < jsonResponseArray.length; d++) {
          jsonResponseArray[d].startTime = new Date(jsonResponseArray[d].startTime);
          jsonResponseArray[d].endTime = new Date(jsonResponseArray[d].endTime);

          let jobstatus = 0;
          let statusdes ='';
          let now = moment();
          let endTime = moment(jsonResponseArray[d].endTime,'hour');
          let minDiff = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(now, "HH:mm:ss"))).format("HH:mm");
          let startTime = moment(jsonResponseArray[d].startTime,'hour');
      
           let start = jsonResponseArray[d].startTime.getTime();
           let end =   jsonResponseArray[d].endTime.getTime();
           let rightnow =  new Date().getTime();
           let diffStart = start - rightnow;
           let diffEnd = end - rightnow;
          //  let isEmpty = true;
          //  if(jsonResponseArray[d].assignedGuards.length>0){
          //    isEmpty = false;
          //  }
          if(diffStart>1){
            jobstatus=3;
            statusdes = 'Job will start '+ startTime.fromNow();
            jsonResponseArray[d].jobstatus=jobstatus;
            jsonResponseArray[d].statusdes=statusdes;
            formattedJobs.push(jsonResponseArray[d]);
          }

        } 
        for (d = jsonResponseArray.length-1; d >-1 ; d--) {
          jsonResponseArray[d].startTime = new Date(jsonResponseArray[d].startTime);
          jsonResponseArray[d].endTime = new Date(jsonResponseArray[d].endTime);

          let jobstatus = 0;
          let statusdes ='';
          let now = moment();
          let endTime = moment(jsonResponseArray[d].endTime,'hour');
          let minDiff = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(now, "HH:mm:ss"))).format("HH:mm");
          let startTime = moment(jsonResponseArray[d].startTime,'hour');
      
           let start = jsonResponseArray[d].startTime.getTime();
           let end =   jsonResponseArray[d].endTime.getTime();
           let rightnow =  new Date().getTime();
           let diffStart = start - rightnow;
           let diffEnd = end - rightnow;
          //  let isEmpty = true;
          //  if(jsonResponseArray[d].assignedGuards.length>0){
          //    isEmpty = false;
          //  }
           if(diffEnd<1){
            jobstatus=1;
            statusdes = 'Ended';
            jsonResponseArray[d].jobstatus=jobstatus;
            jsonResponseArray[d].statusdes=statusdes;
            formattedJobs.push(jsonResponseArray[d]);
          }else if(diffStart<1){
            jobstatus=1;
            statusdes = 'Expired';
            jsonResponseArray[d].jobstatus=jobstatus;
            jsonResponseArray[d].statusdes=statusdes;
            formattedJobs.push(jsonResponseArray[d]);
          }

        } 

      } 
      else {

        this.emptyJobs = true;

      }


      this.EmployeeJobs = formattedJobs;

      this.dataSource = new MatTableDataSource<BookedJob>(this.EmployeeJobs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinnerService.hide();


    });

  }

  bookJobRequest(): void {

    this.router.navigate(['/addjob']);

  }


  getColor(row:any) {
       
       if(row.jobstatus==1){
         return "#E8E8E8";
       }
       if(row.jobstatus==2){
        return "#E8F1FE"//"#FFDADA";
      }
      
      }

      getFont(row:any) {
       
           if(row.jobstatus==3 || row.jobstatus==2){
             return "bold";
           }
         
          
          }


          getShadow(row:any) {
            if(row.jobstatus==2){
              return "5px 10px 8px #888888;";
            }
            
          }

          getAnimDur(row:any) {
            if(row.jobstatus==2){
              return "1s";
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

  employee() {

    this.router.navigate(['/employee']);

  }

}




