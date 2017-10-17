import { Component, ViewChild} from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
  ) {
    
  }

   ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems;
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {
    // kiem tra xem session da co chua
    // neu chua co ta se them
    // neu co roi ta se xoa
    if (this.user.kiemtraF(sessionData.name)) {
      this.removeFavorite(slidingItem, sessionData);
    } else {
      // thêm favorite
      this.user.themF(sessionData.name);

      // tạo alert
      let alert = this.alertCtrl.create({
        title: 'Đã thêm thành công',
        buttons: [{
          text: 'OK',
          handler: () => {
            // đóng item
            slidingItem.close();
          }
        }]
      });
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any) {
    let alert = this.alertCtrl.create({
      title: 'Bạn muốn xóa favorite này?',
      buttons: [
        {
          text: 'Không',
          handler: () => {
            
            slidingItem.close();
          }
        },
        {
          text: 'Đồng ý',
          handler: () => {
          // xoa favorite
            this.user.xoaF(sessionData.name);
            this.updateSchedule();
            slidingItem.close();
          }
        }
      ]
    });
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    
    
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
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
}
