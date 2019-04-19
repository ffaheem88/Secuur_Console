import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee }  from '../employee';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PageEvent } from '@angular/material';
import {EmployeeService} from '../employee.service'
import * as moment from 'moment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {


  dataSource;

  displayedColumns = ['name', 'email', 'phone','id'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  myToken = '';
  screenWidth:number;

  emptyJobs:boolean=false;

  constructor(private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
  private empService:EmployeeService) {

    this.myToken = localStorage.getItem("token");
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };

  }

  ngOnInit() {
    if(this.screenWidth<840){
      this.displayedColumns = ['name'];
      }
    this.spinnerService.show();
    this.empService.getClientEmployees().subscribe( data => {

      this.spinnerService.hide();
      console.log(data);
      this.dataSource = new MatTableDataSource<Employee>(data);;
     // this.router.navigate(['/employee']);

} 
);
   
  }

  ngAfterViewInit() {
  }

  


  bookJobRequest(): void {

    this.router.navigate(['/addjob']);

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

  addemployee() {

    this.router.navigate(['/add-employee']);

  }

  

  settings() {

    this.router.navigate(['/settings']);

  }

}





