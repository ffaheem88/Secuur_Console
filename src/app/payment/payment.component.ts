import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { PaymentService } from '../payment.service';
import { PaymentMethod } from '../paymentmethod';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {

  paymentMethods : PaymentMethod[];

  emptyPaymentMethods : boolean;

  displayedColumns = ['brand','last4','delete'];

  dataSource = new MatTableDataSource<PaymentMethod>();
  screenWidth:number;

  constructor(private paymentService: PaymentService, 
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService) { this.screenWidth = window.innerWidth;
                window.onresize = () => {
                  // set screenWidth on screen size change
                  this.screenWidth = window.innerWidth;
                };}


  ngOnInit() {

    if ( localStorage.getItem("token") == "" ) {
          this.router.navigate(['/login']);
    }
    else {
      this.spinnerService.show();
      this.getPaymentMethods();
    }   

  }

  
  getPaymentMethods() {

     
     this.paymentService.getPaymentMethods().subscribe(data => 
       {                
         this.paymentMethods = JSON.parse(JSON.stringify(data)).data;
        console.log(data);
         if(this.paymentMethods.length==0) {

            this.emptyPaymentMethods=true;

         }
         else {

            this.emptyPaymentMethods=false;

         }

         this.dataSource = new MatTableDataSource<PaymentMethod>(this.paymentMethods);

         this.spinnerService.hide();

         //this.router.navigate(['/payment']);
         
      } );

  }
 

  deletePaymentMethod(paymentMethod: PaymentMethod) {
      
    this.spinnerService.show();

     this.paymentService.deletePaymentMethod(paymentMethod.id).subscribe(data => 

       {

          this.paymentMethods = [];

          this.getPaymentMethods(); 

       }

     );



  } 

    	logout() : void {

      localStorage.setItem("token","");
      this.router.navigate(['/login']);

 }

   home() {

      this.router.navigate(['/bookedjobs']);

   }

   addcards() {

      this.router.navigate(['/addcard']);

   }
   addbankaccounts() {

      this.router.navigate(['/addbankaccount']);

   }

   addjob() {

      this.router.navigate(['/addjob']);

    }

   settings() {

      this.router.navigate(['/settings']);

    }



}
