import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  arrfavorites: string[] = [];//mang favorite
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  public usernameOld : string;
  public passwordOld: string;
  // neu la 1: thi login la 2 thi logout la 3 thi signin
  eventLogin: any;
  constructor(
    public events: Events,
    public storage: Storage
  ) {}
  // kiem tra xem da sessionName da co trong favorite chua.
  kiemtraF(sessionName: string): boolean {
    return (this.arrfavorites.indexOf(sessionName) > -1);
  };


  // them favorite
  themF(sessionName: string): void {
    this.arrfavorites.push(sessionName);
  };

  // xoa favorite
  xoaF(sessionName: string): void {
    let index = this.arrfavorites.indexOf(sessionName);
    if (index > -1) {
      this.arrfavorites.splice(index, 1);
    }
  };

  login(): string {
    this.storage.get('password').then((value)=>{
      this.usernameOld = value;
    });
    console.log(this.usernameOld);
    return this.usernameOld;
  };

  signup(username: string, password: string, eventLogin:any): void {
    if(eventLogin == 3){
    this.setUsername(username);
    this.setPassword(password);
    this.events.publish('user:signup');
    }
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };
  setPassword(password:string):void{
    this.storage.set('password',password);
  }
  getPassword(): string {
    this.storage.get('password').then((value)=>{
      this.passwordOld = value;
    });
    console.log(this.passwordOld);
    return this.passwordOld;
  };
  getUsername():  string {
    this.storage.get('username').then((value)=>{
      this.usernameOld = value;
    });
    console.log(this.usernameOld);
    return this.usernameOld;
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get('username').then((value )=> {
      return value;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
