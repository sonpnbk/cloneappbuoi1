import { Component,Output,EventEmitter} from '@angular/core';
import {AlertController,ActionSheetController, Keyboard,IonicPage,Events,LoadingController, ModalController,NavController,ToastController, NavParams,Platform ,Refresher } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';
import { SettingsPage} from '../settings/settings';
import {Calendar} from '@ionic-native/calendar';
import {Broadcaster} from '@ionic-native/broadcaster';
import {AddnewjobPage} from '../addnewjob/addnewjob';
import { DatePicker } from '@ionic-native/date-picker';
import * as moment from 'moment';
import * as _ from "lodash";
/**
 * Generated class for the SqlitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const DATA_FILE_NAME:string = "cloneapp.db"; 
@IonicPage()
@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html',
})

export class SqlitePage {
  datlichs = [];
  DayDatlich:string;
 private mindate:string;
 forgot = true;
 mdate = new Date();
 calendarsegment= 'days';
 @Output() onDaySelect = new EventEmitter<dateObj>();
 currentYear: number;  
 currentMonth: number;
 ngaydatlich:string;
 currentDate: number;
 currentDay: number;
 displayYear: number;
 displayMonth: number;
 displayDay: number;
 dateArray: Array<dateObj> = [];
 weekArray = [];
 lastSelect: number = 0; 
 weekHead: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private datePicker: DatePicker,public alertCtrl:AlertController,public actionSheetCtrl: ActionSheetController,public broadcaster:Broadcaster,public keyboard: Keyboard,public event:Events,public loadingCtrl:LoadingController,public modalCtrl:ModalController,public toastCtrl:ToastController,public navCtrl: NavController, private databaseprovider: DatabaseProvider, private platform: Platform) {
    this.DayDatlich =this.mdate.toLocaleDateString();
    this.mdate.setHours(this.mdate.getHours()-(this.mdate.getTimezoneOffset()/60));
    this.mindate = this.mdate.toTimeString();
    this.currentYear = moment().year();
    this.currentMonth = moment().month();
    this.currentDate = moment().date();
    this.currentDay = moment().day();
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.broadcaster.fireNativeEvent('event-cal',{});    
        this.loadDatlichData(this.DayDatlich);
      }
    });
  
    
  }
 
  loadDatlichData(day:string) {
    this.broadcaster.fireNativeEvent('event-cal',{});    
    this.databaseprovider.getDayDatlichs(day).then(data => {
      this.datlichs = data;
    })
  }
  doRefresh(refresher: Refresher,day:string) {
    day=this.DayDatlich;
    this.loadDatlichData(new Date().toLocaleDateString());
   
      setTimeout(() => {
        refresher.complete();
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000
        });
        loader.present();
      }, 1000);
 
  }

  closeCallback() {
    // call what ever functionality you want on keyboard close
    console.log('Closing time');
  }
  createEventCalendar(){
    
  }
  goCreated(){
    let modal = this.modalCtrl.create(AddnewjobPage);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      this.loadDatlichData(new Date().toLocaleDateString());
    });
  }
  getOneJob(dat:any){
   
    let actionSheet = this.actionSheetCtrl.create({
      title: dat.tieude,
      buttons: [
        {
          text: dat.thoigianbatdau+' - '+dat.thoigianketthuc,
          role: 'destructive',
          icon: 'time',
        }
        ,{
          text: dat.noidung,
          icon: 'text',
        }
        ,{
          text: dat.buoi,
          icon: 'menu',
          handler: () => {
            console.log('Archive clicked');
          }
        }
        ,{
          text: 'Edit',
          role: 'Edit',
          icon: 'brush',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        ,{
          text: 'Remove',
          role: 'Remove',
          icon:'remove-circle',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Remove job',
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.xoaDatlich(dat.id);
                }
              }]
            });
            alert.present();
          }
        }
      ]
    });
    actionSheet.present();
  }

  setTitle(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.DayDatlich=date.toLocaleDateString();
        this.loadDatlichData(this.DayDatlich);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  ngOnInit() {
    this.today()
}
today() {
    this.displayYear = this.currentYear;
    this.displayMonth = this.currentMonth;
    this.displayDay = this.currentDate;
    this.createMonth(this.currentYear, this.currentMonth);

    let todayIndex = _.findIndex(this.dateArray, {
        year: this.currentYear,
        month: this.currentMonth,
        date: this.currentDate,
        isThisMonth: true
    })
    this.lastSelect = todayIndex;
    this.dateArray[todayIndex].isSelect = true;
    this.dateArray[todayIndex].isHave = false;
    this.onDaySelect.emit(this.dateArray[todayIndex]);
}

createMonth(year: number, month: number) {
    this.dateArray = [];
    this.weekArray = [];
    let firstDay;
    let preMonthDays;
    let monthDays;
    let weekDays: Array<dateObj> = [];

    firstDay = moment({ year: year, month: month, date: 1 }).day();
    if (month === 0) {
        preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
    } else {
        preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
    }
    monthDays = moment({ year: year, month: month }).daysInMonth();
    if (firstDay !== 7) { 
        let lastMonthStart = preMonthDays - firstDay + 1;
        for (let i = 0; i < firstDay; i++) {
            if (month === 0) {
                this.dateArray.push({
                    year: year,
                    month: 11,
                    date: lastMonthStart + i,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                    isHave: false,
                })
            } else {
                this.dateArray.push({
                    year: year,
                    month: month - 1,
                    date: lastMonthStart + i,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                    isHave: false,
                })
            }

        }
    }

    for (let i = 0; i < monthDays; i++) {
        this.dateArray.push({
            year: year,
            month: month,
            date: i + 1,
            isThisMonth: true,
            isToday: false,
            isSelect: false,
            isHave: false,
        })
    }

    if (this.currentYear === year && this.currentMonth === month) {
        let todayIndex = _.findIndex(this.dateArray, {
            year: this.currentYear,
            month: this.currentMonth,
            date: this.currentDate,
            isThisMonth: true
        })
        this.dateArray[todayIndex].isToday = true;
    }

    if (this.dateArray.length % 7 !== 0) {
        let nextMonthAdd = 7 - this.dateArray.length % 7
        for (let i = 0; i < nextMonthAdd; i++) {
            if (month === 11) {
                this.dateArray.push({
                    year: year,
                    month: 0,
                    date: i + 1,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                })
            } else {
                this.dateArray.push({
                    year: year,
                    month: month + 1,
                    date: i + 1,
                    isThisMonth: false,
                    isToday: false,
                    isSelect: false,
                })
            }

        }
    }
    
    for (let i = 0; i < this.dateArray.length / 7; i++) {
        for (let j = 0; j < 7; j++) {
            weekDays.push(this.dateArray[i * 7 + j]);
        }
        this.weekArray.push(weekDays);
        weekDays = [];
    }
}

back() {
    if (this.displayMonth === 0) {
        this.displayYear--;
        this.displayMonth = 11;
    } else {
        this.displayMonth--;
    }
    this.createMonth(this.displayYear, this.displayMonth);
}

forward() {
    if (this.displayMonth === 11) {
        this.displayYear++;
        this.displayMonth = 0;
    } else {
        this.displayMonth++;
    }
    this.createMonth(this.displayYear, this.displayMonth);
}
daySelect(day, i, j) {
    this.dateArray[this.lastSelect].isSelect = false;
    this.lastSelect = i * 7 + j;
    this.dateArray[i * 7 + j].isSelect = true;
    this.displayDay = this.dateArray[i * 7 + j].date;
    this.displayMonth = this.dateArray[i*7+j].month;
    this.DayDatlich= (this.displayMonth+1)+'/'+this.displayDay+'/'+this.displayYear;
    this.onDaySelect.emit(day);
    console.log(this.DayDatlich >= this.mdate.toLocaleDateString());
}
xoaDatlich(id:any){
  this.databaseprovider.deleteDatlic(id);
  this.loadDatlichData(this.DayDatlich);
}
setForgot(){
  if(this.calendarsegment==='Calendar'){
    this.forgot=false;
  }else if(this.calendarsegment==='days'){
    this.forgot=true;
  }
}
}


interface dateObj {
year: number,
month: number,
date: number,
isThisMonth: boolean,
isToday?: boolean,
isSelect?: boolean,
isHave?:boolean,
}
