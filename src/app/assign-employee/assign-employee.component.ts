import { Component, OnInit, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PageEvent } from '@angular/material';
import { Employee }  from '../employee';
import {EmployeeService} from '../employee.service'
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import { BookedJob } from '../bookedjob';

import * as moment from 'moment';

@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.css']
})

export class AssignEmployeeComponent implements OnInit {
  Available: Employee[];
  
   Assigned: Employee[];
   jbmsg;
  dataSourceAvailable = new MatTableDataSource<Employee>(this.Available);
  dataSourceAssigned = new MatTableDataSource<Employee>(this.Assigned);
  displayedColumns = ['name', 'status','id'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  myToken = '';
  bookedJob : BookedJob;
  emptyJobs = false;
job_id:any;
screenWidth:number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
  private changeDetectorRefs:ChangeDetectorRef,
private empService:EmployeeService,
private jobService: JobService) {

    this.myToken = localStorage.getItem("token");
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }


  getBookedJob(): void  {

    //retrieving the id of the booked job from the activated route
    const id = +this.route.snapshot.paramMap.get('id');
  
    this.spinnerService.show();
 
    

    this.jbmsg = this.jobService.getJob(id);
    this.jbmsg.subscribe(data => this.bookedJob = data,
         error => console.log(error),
         () => { 


                        
          this.Assigned = this.bookedJob.assignedGuards;     
          this.dataSourceAssigned = new MatTableDataSource<Employee>(this.Assigned);
          console.log(this.bookedJob);
          this.getAvailableEmployees();
         

    } );


  }
  employee(employee:Employee){

    console.log(employee);
    this.router.navigateByData({
      url: ["/employee-detail"],
      data: employee, //data - <any> type
      //extras: {} - <NavigationExtras> type, optional parameter
    });
    //   this.router.navigate(
    //     ["/employee-detail",employee]
    // );
    
    
    
    }
      

  getAvailableEmployees(){
    
    this.empService.getAvailableEmployees(JSON.stringify(this.bookedJob)).subscribe(data=>{
      this.Available = data;
      this.dataSourceAvailable = new MatTableDataSource<Employee>(this.Available);
      this.spinnerService.hide();
    })
   // this.spinnerService.hide();

  }

  ngOnInit() {

   this.getBookedJob();
  }

  ngAfterViewInit() {

    }

  remove(id){
    // for (let element of this.Assigned) {
    //   console.log(element.id)
    //   if(element.id==id){
    //     this.Assigned.splice(this.Assigned.indexOf(element),1)
    //     this.Available.push(element);
    //     this.dataSourceAvailable = new MatTableDataSource<Employee>(this.Available);
    //     this.dataSourceAssigned = new MatTableDataSource<Employee>(this.Assigned);
    //   }
    //  }
    let empjob = {
      "guard_id":id,
      "job_id":this.bookedJob.id
    }
    console.log(JSON.stringify(empjob));


    this.empService.removeEmployee(JSON.stringify(empjob)).subscribe(data=>{
      console.log(data);
      this.getBookedJob();
    
    })
   
  }

  assign(id){
    // for (let element of this.Available) {
    // console.log(id);
    //   if(element.id==id){
    //     this.Available.splice(this.Available.indexOf(element),1)
    //     this.Assigned.push(element);
    //     this.dataSourceAvailable = new MatTableDataSource<Employee>(this.Available);
    //     this.dataSourceAssigned = new MatTableDataSource<Employee>(this.Assigned);
    //   }
    //  }
    let empjob = {
      "guard_id":id,
      "job_id":this.bookedJob.id
    }
    console.log(JSON.stringify(empjob));

    this.empService.assignEmployee(JSON.stringify(empjob)).subscribe(data=>{
      console.log(data);
      this.getBookedJob();
    
    })
    
  }


  bookJobRequest(): void {

    this.router.navigate(['/addjob']);

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


 

