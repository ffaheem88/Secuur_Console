import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Client } from './client';



@Injectable()
export class AuthenticationService {
  url:String = 'https://enterprise.secuur.co/';
  
  constructor(private http: HttpClient) { }

   addClient(client: string): Observable<any> {     

      return this.http.post(this.url+"RegisterClient", client);
   
   }

  

   forgotPassword(clientCredentials : string) : Observable<any> {
    
    return this.http.post<Client[]>(this.url+"ForgotPasswordClient",clientCredentials);

 }
   loginClient(clientCredentials : string) : Observable<any> {


      return this.http.post<Client[]>(this.url+"AuthenticateClient",clientCredentials);

   }
     
  

}
