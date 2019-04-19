import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PaymentMethod } from './paymentmethod';


@Injectable()
export class PaymentService {

    url:String = 'https://enterprise.secuur.co/';

  constructor(private http: HttpClient) { }
  

  addPaymentMethod(stripeToken: string): Observable<any> {

     console.log("Token: " + stripeToken);

      let headers = new HttpHeaders(
          {'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem("token")
           }
      );

      let jsonStripeToken = {
             "stripetoken": stripeToken
      } 


      console.log("Posting this: " + JSON.stringify(jsonStripeToken));

      return this.http.post(this.url+"AddPaymentMethod", 
               JSON.stringify(jsonStripeToken), { headers : headers } );
      

   }
 
   getPaymentMethods(): Observable<PaymentMethod[]> {

      let headers = new HttpHeaders(
          {'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem("token")
           }
      );

      return this.http.get<PaymentMethod[]>(this.url+"GetPaymentMethods", { headers : headers } );


   } 


   deletePaymentMethod(id: string): Observable<any> {

      let headers = new HttpHeaders(
          {'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem("token")
           }
      );

      let paymentMethodId = {
             "stripetoken": id
      }

      return this.http.post(this.url+"DeletePaymentMethod",
               JSON.stringify(paymentMethodId), { headers : headers } );


   }


}
