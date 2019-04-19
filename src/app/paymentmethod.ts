
   export class PaymentMethod {

       constructor(
         public id: string,
         public brand: string,
         public lastFourDigits: string,
         public expMonth: number,
         public expyear : number
       ) {}

   }
