import { Component,ViewChild,Output ,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,ViewController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import { Calendar } from '@ionic-native/calendar';
import * as moment from 'moment';
import * as _ from "lodash";

/**
 * Generated class for the AddnewjobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addnewjob',
  templateUrl: 'addnewjob.html',
})
export class AddnewjobPage {
  datlich = {};
  DayDatlich:string;
  mdate = new Date();
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
      forgot = false;
      weekHead: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(public calendar:Calendar,public viewCtrl: ViewController,private databaseprovider: DatabaseProvider,public toastCtrl:ToastController,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.DayDatlich =this.mdate.toLocaleDateString();
    this.currentYear = moment().year();
    this.currentMonth = moment().month();
    this.currentDate = moment().date();
    this.currentDay = moment().day();

  }

  ionViewDidLoad() {
    this.datlich['thoigianbatdau']='08:00';
    this.datlich['thoigianketthuc']='09:00';
  }
  addDatlich() {
    console.log(this.DayDatlich);
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    if((this.datlich['noidung']!=null)&&(this.datlich['thoigianbatdau']!=null)&&(this.datlich['thoigianketthuc']!=null)&&(this.datlich['tieude']!=null&&(this.DayDatlich >= this.mdate.toLocaleDateString()))){
    this.databaseprovider.addDatlich(this.DayDatlich,this.datlich['thoigianbatdau'],this.datlich['thoigianketthuc'], this.datlich['tieude'], this.datlich['noidung'],this.datlich['thongbao'],"morning");
    this.datlich = {};
    this.dismiss();
  }
  else{
    const toast = this.toastCtrl.create({
      message: 'error',
      duration: 3000
    });
    toast.present();
   
  }
 

  }
  dismiss() {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss();
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
