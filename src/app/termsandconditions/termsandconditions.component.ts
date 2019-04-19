import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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

     register(){
      this.router.navigate(['/register']);
    }


}
