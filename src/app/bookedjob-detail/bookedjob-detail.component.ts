import { Component, OnInit, Input, ViewChild,ElementRef, NgZone } from '@angular/core';
import { BookedJob } from '../bookedjob';
import { Client } from '../client';

import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import {} from '@types/googlemaps';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddmarkerComponent } from '../addmarker/addmarker.component';
import * as moment from 'moment';

declare var google: any;
declare var RichMarker: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-bookedjob-detail',
  templateUrl: './bookedjob-detail.component.html',
  styleUrls: ['./bookedjob-detail.component.css']
})

export class BookedjobDetailComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('element') element: ElementRef;
  map: any;
  bookedJob : BookedJob;

  dataSource = new MatTableDataSource<BookedJob>();

  //displayedColumns = ['address','startTime','numberOfGuards','duration','instructions'];
  chats:any[];
  curLat : number;
  curLng : number;
  message: string;
  myToken : string;
  nickname: string;
  guardPic :  string;
  pic:any;
  screenWidth: number;
  showLocs:boolean=false;
  showMsgs:boolean=false;
  infowindow;
  markers = [];
  profiles = [];
  histMarkers=[];
  refHist;
  profile;
  ref;
  refguard;
  fbmsg;
  jbmsg;
  refChat;
  timeLeft:String;
  showimage:boolean=false;
  constructor( private route: ActivatedRoute,
               private jobService: JobService,
               private router: Router,
               private spinnerService: Ng4LoadingSpinnerService,
               public afDatabase: AngularFireDatabase,
               private dialog: MatDialog,
              private ngzone:NgZone) {


     this.myToken = localStorage.getItem("token");
     this.screenWidth = window.innerWidth;
     window.onresize = () => {
       // set screenWidth on screen size change
       this.screenWidth = window.innerWidth;
     };

   }



   hideFullImage(){
    this.showimage = !this.showimage;
  }

  showFullImage(chat){
   if(chat.type==='image'){
   
      this.showimage = !this.showimage;

    this.pic = chat.message;     
    
      }
  }

   openDialog(lat,lng) {
    
            const dialogConfig = new MatDialogConfig();
    
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = this.bookedJob.assignedGuards;
           
            
            const dialogRef =  this.dialog.open(AddmarkerComponent,dialogConfig);
            dialogRef.afterClosed().subscribe(data =>{
              if(data.description.length>0 && data.selected==undefined){

              this.updateGeolocation(Date(), lat, lng, data.description + "</p><p style='font-size:12px;color:#4286F4'>Posted by: " + this.bookedJob.client.company, 'point');
              }else if(data.description.length>0 && data.selected!=undefined){
              this.updateGuardMarker(Date(),data.selected,lat,lng,data.description + "</p><p style='font-size:12px;color:#4286F4'>Posted by: " + this.bookedJob.client.company + " for " + data.selected.first_name + " " + data.selected.last_name, 'point')
              }
               console.log("Dialog output:", data)
            }
          );    
        }

    updateGeolocation(uuid, lat, lng, name, pic) {
          let newData = this.afDatabase.object(this.bookedJob.id + '/geolocations/' + uuid);
          newData.set({
            id: uuid,
            latitude: lat,
            longitude: lng,
            name: name,
            pic: pic,
            time: new Date().toLocaleString()
          }).then(newBill => {
          }, error => {
            console.log(error);
          });;
       }

       randomnumber(){
        let num = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2);
        return num.substring(0,39);
      }
       updateGuardMarker(uuid, guard, lat, lng, name, pic) {
         let newid= guard.id + this.randomnumber();
        let newData = this.afDatabase.object(this.bookedJob.id + '/assigned/'+newid);
        newData.set({
          id: newid,
          latitude: lat,
          longitude: lng,
          name: name,
          pic: pic,
          time: new Date().toLocaleString()
        }).then(newBill => {
        }, error => {
          console.log(error);
        });;
     }

  ngOnInit() {
    
  this.bookedJob = new BookedJob('','','',new Date(),new Date(),'','','','','','',new Client(0,'','','','','','','','','','',''),0,'');
    //ensure user is logged in before retrieving booked jobs
    if( this.myToken != "") {
      this.getBookedJob();
      
    }
    else {
     this.router.navigate(['/login']);
    }

  }

  

  initMap(){
    
       let mylocation = new google.maps.LatLng(this.curLat, this.curLng);
       this.map = new google.maps.Map(this.mapElement.nativeElement, {
         zoom: 18,
             center: mylocation,
             backgroundColor: '#000000',
             clickableIcons: false,
             disableDoubleClickZoom: true,
             mapTypeControl: true,
             mapTypeId: 'roadmap',
             mapTypeControlOptions: {
               style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
               position: google.maps.ControlPosition.TOP_CENTER
             },
             streetViewControl: false,
             streetViewControlOptions: {
               position: google.maps.ControlPosition.TOP_CENTER
             },
             zoomControl: false,
             scaleControl: false,
             fullscreenControl: false,
             rotateControl: false
           });
           google.maps.event.addListener(this.map, 'dblclick', (event) => {
            this.ngzone.run(() => {
              this.openDialog(event.latLng.lat(),event.latLng.lng());
            });
            
          });
   }


   sendChatNotification(){
    this.jobService.sendChatNotify(this.bookedJob).subscribe(res => {
    }, err => {
      console.log(err);
    })
  }

  changeToGuardPosition(id:any){
    for (let i = 0; i < this.markers.length; i++) {
      if(this.markers[i].id==id){
         this.changeMapCenter((this.markers[i].position));
         google.maps.event.trigger(this.markers[i], 'click', {});
       }
     }
  }

  getBookedJob(): void  {

    //retrieving the id of the booked job from the activated route
    const id = +this.route.snapshot.paramMap.get('id');
    this.spinnerService.show();
    this.jbmsg = this.jobService.getJob(id);
    this.jbmsg.subscribe(data => this.bookedJob = data,
         error => console.log(error),
         () => { 
               this.curLat = Number(this.bookedJob.lat);
               this.curLng = Number(this.bookedJob.lng);               
               this.bookedJob.startTime = new Date(this.bookedJob.startTime);
               this.bookedJob.endTime = new Date(this.bookedJob.endTime);
               this.ref = this.afDatabase.list(this.bookedJob.id + '/geolocations/');
               this.refguard = this.afDatabase.list(this.bookedJob.id + '/assigned/')
               this.nickname = this.bookedJob.client.company;
               this.initMap();
               this.GetFbData();
               this.getMsgs();
               this.calcTimeLeft();
               setInterval(() => {
                this.calcTimeLeft();
                }, 60000);
               this.spinnerService.hide();
    } );


  }

  changeCenterToAdress() {
    let updatelocation = new google.maps.LatLng(this.bookedJob.lat, this.bookedJob.lng);
    this.changeMapCenter(updatelocation);
  }

  changeMapCentertoPoint(marker){
    google.maps.event.trigger(marker, 'click', {});
    this.changeMapCenter(marker.position);
  }


  changeMapCenter(position) {
    this.map.panTo(position);
    this.map.setZoom(19);
    this.clearHistMarkers();
  }


clearHistMarkers(){
  for (var i = 0; i < this.histMarkers.length; i++) {
    this.histMarkers[i].setMap(null);
  }
  this.histMarkers=[];
}

showHistMarker(id){
this.clearHistMarkers();
 
  this.refHist = this.afDatabase.list(this.bookedJob.id + '/history/'+id)
  

 let hist = this.refHist.valueChanges();

    let chist=hist.subscribe(loc => {
          
          let x = 0;
          let y=0;
          let total=loc.length;
          let avglat = 0;
          let avglng = 0;
          let samplesize = Math.round(total/150);
          loc.forEach(data => {
            avglat = avglat+data.latitude;
            avglng = avglng+data.longitude;
            y++;
            if(y==samplesize){
              let color=Math.round(((x*samplesize)/total)*255);
              let updatelocation = new google.maps.LatLng(avglat/samplesize,avglng/samplesize);
              let infowindow = new google.maps.InfoWindow({
                content: "<p style='color:#000000;font-weight:600;'>" + data.name + "</p><p style='color:#000000;font-weight:600;'>"+data.time+"</p>"
              });
              let marker = new RichMarker({ 
                id:id,
                position: updatelocation,
                map:this.map,
                content:"<div style='padding-top:1px;text-align:center;font-size:11px;color:white;margin-bottom:-20px;width:20px;height:20px;border-radius: 50%;box-shadow: 2px 3px 4px rgba(0, 0, 0, .8);background:rgba("+color+", 0, 0, 1)'>"+x+"</div>",
                shadow: 0
              });

              marker.addListener('click', function () {
                infowindow.open(this.map, marker);
              });
            this.histMarkers.push(marker);
            avglat=0;
            avglng=0;
            y=0;
            x++;
            }
            
           
          })
          console.log("done!");
          this.map.panTo(this.histMarkers[1].position);
    this.map.setZoom(17);
          chist.unsubscribe();
        }, err => {
          console.log(err);}
        ,error => console.log("Error: ", error),
        // The 3rd callback handles the "complete" event.
        () =>{
        
        }
      );

}


  addMarker(id, location, image, title, time,raw) {
    
        let foundexmarker = false;
       
        for (let i = 0; i < this.markers.length; i++) {
          if(this.markers[i].id==id){
            let infowindow = new google.maps.InfoWindow({
              content: "<p style='color:#000000;font-weight:600;'>" + title + "</p><p style='color:#000000;font-weight:600;'>"+time+"</p>"
            });
        
            this.markers[i].setPosition(location);
            google.maps.event.clearListeners(this.markers[i], 'click');
            this.markers[i].addListener('click', (event) => {
              infowindow.open(this.map, this.markers[i]);
            });
            foundexmarker=true; 
            for(let x = 0;x<this.profiles.length;x++){
              if(this.markers[i].id==this.profiles[x].id){
                this.profiles[x].position=location;
                this.profiles[x].name=title;
              }
              }
          }
          
        }
        
        
        if(!foundexmarker){
          let infowindow = new google.maps.InfoWindow({
            content: "<p style='color:#000000;font-weight:600;'>" + title + "</p><p style='color:#000000;font-weight:600;'>"+time+"</p>"
          });
        if (image.length < 1) {
          image = './assets/blank-guard.png';
        }
    
        let img = "<img src='" + image + "' style='margin-bottom:-35px;width:35px;height:35px;object-fit:cover;border-radius: 50%;box-shadow: 2px 3px 4px rgba(0, 0, 0, .8);'>";
        if (image.includes("location")) {
          img = "<img src='"+image+"' style='margin-bottom:-35px;width:50px;height:50px;'>";
        }else if(image.includes("qricon")){
          img = "<img src='./assets/location.png' style='margin-bottom:-35px;width:50px;height:50px;'>";
        } else {
          let p = {
            id:id,
            position: location,
            pic: image,
            name: title
          }
          this.profiles.push(p);
        }
        let marker = new RichMarker({ 
          id:id,
          position: location,
          map: this.map,
          content: img,
          shadow: 0,
          img:image,
          title: time,
          dat:title,
          raw:raw
        });
        if (image.includes("location") || image.includes("qricon")) {
    
          marker.addListener('click', function () {
    
            infowindow.open(this.map, marker);
          });
        } else {
    
          for (let i = 0; i < this.bookedJob.assignedGuards.length; i++) {
            if (this.bookedJob.assignedGuards[i].id == id) {
              marker.addListener('click', (event) => {
                infowindow.open(this.map, marker);

                //this.navCtrl.push('GuardDetailPage', { profile: this.bookedJob.assignedGuards[i] });
              });
            }
          }
    
        }
       
          this.markers.push(marker);
        }
      }
    
    matchtoguard(id,guardid){
        
      
        
        return(String(id).substring(0,id.length-39)===String(guardid));
      
    }

      calcTimeLeft() {
        let now = moment();
        let endTime = moment(this.bookedJob.endTime,'hour');
        let minDiff = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(now, "HH:mm:ss"))).format("HH:mm");
        let startTime = moment(this.bookedJob.startTime,'hour');
    
    
       
          let start = new Date(this.bookedJob.startTime).getTime();
          let end =   new Date(this.bookedJob.endTime).getTime();
         
          let rightnow =  new Date().getTime();
          let diffStart = start - rightnow;
          let diffEnd = end - rightnow;
          if(diffStart<1){
            this.timeLeft = 'This job will end '+ endTime.fromNow();
          }else{
            this.timeLeft = 'This job will start '+ startTime.fromNow();
          }
          
          if(diffEnd<1){
            this.timeLeft = 'This job has ended';
          }
      
      }

      GetFbData() {
       this.fbmsg =  this.ref.valueChanges();

       this.fbmsg.subscribe(loc => {
          //this.clearMarkers();
          
          let updatelocation = new google.maps.LatLng(this.bookedJob.lat, this.bookedJob.lng);
          this.addMarker(this.bookedJob.id, updatelocation, './assets/location6.png', '<b style="font-size:15px;">Job Address</b><br>' + this.bookedJob.address,'','');
          
    console.log(loc);
          loc.forEach(data => {
            let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);

            if (data.pic == 'point') {
              this.addMarker(data.id, updatelocation, './assets/location7.png', (data.name),data.time,'');
            } else if(data.pic=='scan') {
              this.addMarker(data.id, updatelocation, './assets/qricon.png', (data.name),data.time,data.raw);
            }else{
              this.addMarker(data.id, updatelocation, data.pic, (data.name),data.time,'');
             }
          })
    
        }, err => {
          console.log(err);
        });
        this.refguard.valueChanges().subscribe(loc => {
          //this.clearMarkers();
          
        

          loc.forEach(data => {
            console.log(data);
          
              let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
              
  
                this.addMarker(data.id, updatelocation, './assets/location8.png', (data.name),data.time,'');
           
            
           
          })
    
        }, err => {
          console.log(err);
        });
      }


      ExtendTime(){
        this.spinnerService.show();
        this.calcTimeLeft();

        this.jobService.extendJob(JSON.stringify(this.bookedJob)).subscribe(data=>{
          this.spinnerService.hide();
        });

      }
    
  cancelJob() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.jobService.cancelJob(id).subscribe(data=>{
    });

    this.router.navigate(['/bookedjobs']);

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


   getMsgs(){
    let roomkey = this.bookedJob.id + '/chats';
    this.refChat = this.afDatabase.list(roomkey);
   
    this.refChat.valueChanges().subscribe(data=>{
        data.forEach(chat=>{
          chat.sendDate = moment(chat.sendDate).calendar();
        });
        this.chats = data;
        setTimeout( () => {
          this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
            
   
         },10);
    });
  }

  sendMessage() {
    if(this.message.length>0){
    let newData = this.refChat.push({});
    
    newData.set({
      type: 'message',
      user: this.bookedJob.client.company,
      message: this.message,
      sendDate: Date()
    }).then(newBill => {
      this.message = '';
      this.sendChatNotification();
    }, error => {
        console.log(error);
      });
    }
  }



}
