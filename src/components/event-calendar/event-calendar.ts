import { Component } from '@angular/core';
import {Calendar} from '@ionic-native/calendar';
import {Events} from 'ionic-angular';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Broadcaster} from '@ionic-native/broadcaster';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { DatabaseProvider } from './../../providers/database/database';
/**
 * Generated class for the EventCalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-calendar',
  templateUrl: 'event-calendar.html'
})
export class EventCalendarComponent {
  private tick: number;
  datlichs  = [];

 
  constructor(public databaseprovider:DatabaseProvider,public broadcaster:Broadcaster,public event:Events,public calendar:Calendar,public localNotifications:LocalNotifications) {
    this.broadcaster.addEventListener('event-cal').subscribe((data:any) => this.xulyEvent());
  
  //  this.xulyEvent(data1,data2);
    
   //})
   
  }
  xulyEvent(){
 
    let timeob = TimerObservable.interval(1000).subscribe(t=>{
      this.loadDatlichData(new Date().toLocaleDateString());
      let date = new Date().toTimeString();
   
      for(let dat of this.datlichs){
        console.log(dat.thoigianbatdau);
        console.log(date.indexOf(dat.thoigianbatdau));
        if((date.indexOf(dat.thoigianbatdau)) != -1){
          
          let broadcaster = new LocalNotifications().schedule({
            id:1,
            title:'pham ngoc son',
            text: 'a',
            at: new Date(),
            data: {
            mydata:'My hidden messeage this is'
            }
          });
        } 
      }  
    });
  }
  loadDatlichData(day:string) {
    this.databaseprovider.getDayDatlichs(day).then(data => {
      this.datlichs = data;
    })
  }
}
