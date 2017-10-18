import { Component , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  
  submitted = false;
  @ViewChild ('username') username:any;
  @ViewChild ('password') password:any;
  constructor(public navCtrl: NavController, public userData: UserData) {}

  onSignup() {
      this.userData.signup(this.username.value,this.password.value,3);
      this.navCtrl.push(TabsPage);
  }
}
