import {
  OnInit,
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { PaymentService } from '../payment.service';
import { PaymentMethod } from '../paymentmethod';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  screenWidth:number;

  constructor(private cd: ChangeDetectorRef, 
              private paymentService: PaymentService,
              private spinnerService: Ng4LoadingSpinnerService, 
              private router: Router) {

                this.screenWidth = window.innerWidth;
     window.onresize = () => {
       // set screenWidth on screen size change
       this.screenWidth = window.innerWidth;
     };
              }


  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {

     this.spinnerService.show();

      const { token , error } = await stripe.createToken(this.card);

      if (error) {
           this.spinnerService.hide();
      	   console.log('Something went wrong:', error);
      } 
      else {
      	   this.paymentService.addPaymentMethod(token.id).subscribe( data=> {
            this.spinnerService.hide();
            this.router.navigate(['/payment']);
           });
      }


  }

  ngOnInit() {

    if ( localStorage.getItem("token") == "" ) {
          this.router.navigate(['/login']);
    }

  }


  // getPaymentMethods() {

  //    this.paymentService.getPaymentMethods().subscribe(data =>
  //     {
         
         
  //     }
  //   );


  // }     

 
 
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
