import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close('https://www.facebook.com/PNSonsoapBk')">Learn Ionic</button>
      <button ion-item (click)="close('https://www.facebook.com/PNSonsoapBk')">Documentation</button>
      <button ion-item (click)="close('https://www.facebook.com/PNSonsoapBk')">Showcase</button>
      <button ion-item (click)="close('https://www.facebook.com/PNSonsoapBk')">GitHub Repo</button>
      <button ion-item (click)="support()">Support</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}