import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {
stickers:any=[];
laststicker:any = 0;
empty:boolean=true;
screenWidth:number;
  constructor(public afDatabase: AngularFireDatabase,private router: Router) { 
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.getSticker();
  }


  addsticker() {
    this.laststicker++;
    let newData = this.afDatabase.object('/client/' + localStorage.getItem("id")+'/stickers/'+this.laststicker);
    newData.set({
      id: this.laststicker.toString()
    }).then(newBill => {
      console.log("Sticker added: "+this.laststicker)
    }, error => {
      console.log(error);
    });;
 }


 getSticker(){

  let roomkey = '/client/' + localStorage.getItem("id")+'/stickers/';
  let refChat = this.afDatabase.list(roomkey);
 this.stickers=[];
  refChat.valueChanges().subscribe(data=>{
    this.empty = !(data.length>0);
    this.stickers = data;
      data.forEach(sticker=>{
        console.log(sticker);
        let bar = <any>{};
        bar= sticker;

      // this.stickers.push(sticker)
      this.laststicker = Number(bar.id)
  });
  
  });
}

logout(): void {

  localStorage.setItem("token", "");

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

addemployee() {

  this.router.navigate(['/add-employee']);

}



settings() {

  this.router.navigate(['/settings']);

}
}
