import { Component ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild('username') username: any;
  @ViewChild('password') password: any;
  submitted = false;
  public usernameold :any;
  public passwordold :any;
  constructor(public navCtrl: NavController, public toast: ToastController, public userData: UserData) {
      this.usernameold = this.userData.getUsername();
      this.passwordold = this.userData.getPassword();
   }

  onLogin() {
    console.log(this.usernameold);
    //this.submitted = true;
    
  //  console.log(this.userData.login(this.username.value,this.password.value).value);
  //  if (form.valid) {
   /* if(this.username.value == ''){
      const toast = this.toast.create({
        message: 'Vui long dien ten tai khoan',
        duration: 3000
      });
      toast.present();
    }else
    if(this.password.value == ''){
      const toast = this.toast.create({
        message: 'Vui long dien mat khau',
        duration: 3000
      });
      toast.present();
    }
    if(this.username.value != '' && this.password.value != ''){
   if(this.userData.login(this.username.value,this.password.value)){
    this.navCtrl.push(TabsPage);
   }else{
    const toast = this.toast.create({
      message: 'Mat khau hoac tai khoan khong chinh xac',
      duration: 3000
    });
    toast.present();
   }
  }*/

}

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
