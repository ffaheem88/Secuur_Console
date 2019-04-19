import { Client } from '../app/client';

   export class BookedJob {

       constructor(
         public id : string,
         public address: string,
         public numberOfGuards: string,
         public startTime : Date,
         public endTime: Date,
         public clientId: string,
         public time: string,
         public instructions: string,
         public status: string,
         public lat: string,
         public lng: string,
         public client: Client,
         public duration: number,
         public assignedGuards: any
       ){}

   }
