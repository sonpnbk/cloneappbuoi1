import { Component } from '@angular/core';
import { IonicPage,LoadingController, ModalController,NavController,ToastController, NavParams,Platform ,Refresher } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../../providers/database/database';
import { SettingsPage} from '../settings/settings';
import {LocalNotifications} from '@ionic-native/local-notifications';

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
  datlich = {};
  datlichs = [];
  DayDatlich:string;
 private mindate:string;
 mdate = new Date();
  constructor(public localNotifications : LocalNotifications,public loadingCtrl:LoadingController,public modalCtrl:ModalController,public toastCtrl:ToastController,public navCtrl: NavController, private databaseprovider: DatabaseProvider, private platform: Platform) {
    this.DayDatlich =this.mdate.toDateString();
    this.mdate.setHours(this.mdate.getHours()-(this.mdate.getTimezoneOffset()/60));
    this.mindate = this.mdate.toTimeString();
    this.datlich['thoigianbatdau']=  this.mdate.toISOString();
    this.datlich['thoigianketthuc']=   this.mdate.toISOString();
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDatlichData();
      }
    });
    this.platform.ready().then((rdy)=>{
        this.localNotifications.on('click',(notification,state) => {
          let json = JSON.parse(notification.data);
          
        });
    });
  }
 
  loadDatlichData() {
    this.databaseprovider.getAllDatlichs().then(data => {
      this.datlichs = data;
    })
  }
  doRefresh(refresher: Refresher) {
    
    
    this.databaseprovider.getAllDatlichs().then(data => {
      this.datlichs = data;
      setTimeout(() => {
        refresher.complete();
        console.log(refresher);
        const toast = this.toastCtrl.create({
          message: 'Update thành công',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
  addDatlich() {
    this.localNotifications.schedule({
      id:1,
      title:'pham ngoc son',
      text: 'hello word',
      at: new Date(new Date().getTime()+5*1000),
      data: {
        mydata:'My hidden messeage this is'
      }
    });
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    if((this.datlich['noidung']!=null)&&(this.datlich['thoigianbatdau']!=null)&&(this.datlich['thoigianketthuc']!=null)&&(this.datlich['tieude']!=null)){
    this.databaseprovider.addDatlich(this.DayDatlich,this.datlich['thoigianbatdau'],this.datlich['thoigianketthuc'], this.datlich['tieude'], this.datlich['noidung'])
    .then(data => {
      this.loadDatlichData();
      console.log("okkkk");
    });
    this.datlich = {};
  }
  else{
    const toast = this.toastCtrl.create({
      message: 'error',
      duration: 3000
    });
    toast.present();
   
  }
  }
  gosettings() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.loadDatlichData();
      }
    });

  }
}
