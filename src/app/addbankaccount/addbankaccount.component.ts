import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BankAccountRequest } from '../bankaccountrequest';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-addbankaccount',
  templateUrl: './addbankaccount.component.html',
  styleUrls: ['./addbankaccount.component.css']
})
export class AddbankaccountComponent implements OnInit {
  screenWidth:number;
  constructor( private paymentService : PaymentService, 
               private router : Router,
               private spinnerService: Ng4LoadingSpinnerService ) { 
                this.screenWidth = window.innerWidth;
                window.onresize = () => {
                  // set screenWidth on screen size change
                  this.screenWidth = window.innerWidth;
                };
               }

  bankAccountRequest = new BankAccountRequest("","","");

  bankError : boolean;

  ngOnInit() {
  }



   addBankAccount(bankForm : NgForm) : void {

      this.spinnerService.show();  
    
      stripe.createToken('bank_account', {
        country: 'US',
        currency: 'usd',
        routing_number: bankForm.value.routingNumber,
        account_number: bankForm.value.accountNumber,
        account_holder_name: 'Jane Dorothy',
        account_holder_type: 'individual',
      }).then(function(result) {

            if(result.error) {
 
              this.spinnerService.hide();

              this.bankError = true;

            }    
            else {

               var bankToken = result.token.id;
            
               this.paymentService.addPaymentMethod(bankToken).subscribe(data =>

                  {
                    this.getPaymentMethods();

                  }

               );

            }

          }.bind(this)
 

     );
    

 
   }


    getPaymentMethods() {


     this.paymentService.getPaymentMethods().subscribe(data =>
       
        {
           this.spinnerService.hide();

           this.router.navigate(['/payment']);

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
