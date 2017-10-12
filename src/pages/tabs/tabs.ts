import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage} from '../register/register';
import { SchedulePage} from '../schedule/schedule';
import { SpeakerPage} from '../speaker/speaker'
import {MapPage} from '../map/map';

import {AboutPage} from '../about/about';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = SchedulePage;
  tab2Root = SpeakerPage;
  tab3Root = MapPage;
  tab4Root = AboutPage;
}
