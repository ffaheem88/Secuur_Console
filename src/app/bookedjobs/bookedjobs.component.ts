import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { BookedJob } from '../bookedjob';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PageEvent } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-bookedjobs',
  templateUrl: './bookedjobs.component.html',
  styleUrls: ['./bookedjobs.component.css']
})

export class BookedjobsComponent implements OnInit {

  bookedJobs: BookedJob[];
  screenWidth: number;
  dataSource = new MatTableDataSource<BookedJob>();

  displayedColumns = ['address', 'startTime', 'assignedGuards','jobstatus','details'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateJobMap: Map<string, any>;

  months: string[];

  selectedBookedJob: BookedJob;

  myToken = '';

  emptyJobs = false;

  constructor(private router: Router,
    private jobService: JobService,
    private spinnerService: Ng4LoadingSpinnerService) {
      this.screenWidth = window.innerWidth;
      window.onresize = () => {
        // set screenWidth on screen size change
        this.screenWidth = window.innerWidth;
      };
    this.myToken = localStorage.getItem("token");

    this.months = ["All"];

    this.dateJobMap = new Map();

    this.dateJobMap.set("All", new Array());


  }

  ngOnInit() {

    if (this.myToken === '') {
      this.router.navigate(['/login']);
    } else {
      this.spinnerService.show();
      this.getClientJobs();

    }



  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }

  getClientJobs() {
    if(this.screenWidth<840){
      this.displayedColumns = ['startTime','assignedGuards','details'];
      }

    this.jobService.getClientJobs().subscribe(data => {

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
      
           let start = jsonResponseArray[d].startTime.getTime();
           let end =   jsonResponseArray[d].endTime.getTime();
           let rightnow =  new Date().getTime();
           let diffStart = start - rightnow;
           let diffEnd = end - rightnow;
          
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
           
          if(diffStart>1){
            jobstatus=3;
            statusdes = 'Job will start '+ startTime.fromNow();
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
           
           if(diffEnd<1){
            jobstatus=1;
            statusdes = 'Ended';
            jsonResponseArray[d].jobstatus=jobstatus;
            jsonResponseArray[d].statusdes=statusdes;
            formattedJobs.push(jsonResponseArray[d]);
          }

        } 

      } 
      else {

        this.emptyJobs = true;

      }


      this.bookedJobs = formattedJobs;
console.log(this.bookedJobs);
      this.dataSource = new MatTableDataSource<BookedJob>(this.bookedJobs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinnerService.hide();


    });

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

  bookJobRequest(): void {

    this.router.navigate(['/addjob']);

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  dateSelected(selectedDate) {

    this.spinnerService.show();

    this.bookedJobs = this.dateJobMap.get(selectedDate);

    this.dataSource = new MatTableDataSource<BookedJob>(this.bookedJobs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinnerService.hide();

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





