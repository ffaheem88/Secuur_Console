import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from './employee';


@Injectable()
export class EmployeeService {
  url:String = 'https://enterprise.secuur.co/';

  constructor(private http: HttpClient) { }


 addEmployee(emp: string) : Observable<any> {

  let headers = new HttpHeaders(
       {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
  );

  return this.http.post(this.url+"RegisterGuard", (emp), { headers : headers } ); 

}   


deleteEmployee(emp: string) : Observable<any> {

  let headers = new HttpHeaders(
       {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
  );

  return this.http.post(this.url+"RemoveEmployee", (emp), { headers : headers } ); 

}   

getClientEmployees() : Observable<Employee[]> {
     
  let headers = new HttpHeaders(
       {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
       }
  );


  let body = { 

   }

  return this.http.post<Employee[]>(this.url+"GetAllGuards", JSON.stringify(body), { headers : headers } );


}  

getAvailableEmployees(job:string) : Observable<Employee[]> {
  let headers = new HttpHeaders(
       {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
       }
  );
  return this.http.post<Employee[]>(this.url+"GetAvailableGuards", job, { headers : headers } );
}  

assignEmployee(empjob:string): Observable<any>{
  let headers = new HttpHeaders(
    {'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
);

return this.http.post(this.url+"AssignGuardToJob", empjob, { headers : headers } );
}

removeEmployee(empjob:string): Observable<any>{

  let headers = new HttpHeaders(
    {'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
);

return this.http.post(this.url+"RemoveGuardFromJob", empjob, { headers : headers } );
}

getEmployeeJobs(emp:string): Observable<any>{

  let headers = new HttpHeaders(
    {'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
);

return this.http.post(this.url+"GetGuardJobs", emp, { headers : headers } );
}

}
