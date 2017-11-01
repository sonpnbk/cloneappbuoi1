import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { MapPage } from '../map/map';
import { SqlitePage } from '../sqlite/sqlite';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SqlitePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = SettingsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
