import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { BookedJob } from './bookedjob';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class JobService {

url:String = 'https://enterprise.secuur.co/';

    constructor(private http: HttpClient) { }

    getClientJobs() : Observable<BookedJob[]> {
     
       let headers = new HttpHeaders(
            {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
       );


       let body = { 
        }

       return this.http.post<BookedJob[]>(this.url+"GetJobs", JSON.stringify(body), { headers : headers } );


   }  

   
  addJob(newJob: string) : Observable<any> {

     let headers = new HttpHeaders(
          {'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem("token")
           }
     );

     return this.http.post(this.url+"AddJob", newJob, { headers : headers } ); 
   
  }   

  extendJob(newJob: string) : Observable<any> {

    let headers = new HttpHeaders(
         {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
    );

    return this.http.post(this.url+"ExtendJob", newJob, { headers : headers } ); 
  
 }   


  sendChatNotify(params:BookedJob): Observable<any> {
		
    let headers = new HttpHeaders(
      {'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem("token")
       }
 );

    let body = params;

    return this.http.post(this.url+"NotifyChat", JSON.stringify(body), {headers: headers})
        
  }


   getJob(id: number) : Observable<BookedJob> {

     
     let headers = new HttpHeaders(
          {'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem("token")
           }
     );

     let body = {
        "id" : id
     }

     return this.http.post<BookedJob>(this.url+"GetJob", JSON.stringify(body), { headers : headers } );
   

   }


   cancelJob(id: number) : Observable<any> {


     let headers = new HttpHeaders(
          {'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem("token")
           }
     );

     let body = {
        "id" : id
     }


     return this.http.post(this.url+"CancelJob", JSON.stringify(body), { headers : headers } );


   }


}
