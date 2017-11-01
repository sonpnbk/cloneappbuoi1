import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import { Broadcaster } from '@ionic-native/broadcaster';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SqlitePage} from '../pages/sqlite/sqlite';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { SpeakershowPage} from '../pages/speakershow/speakershow';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { DatabaseProvider} from '../providers/database/database';
import { GoogleMaps} from '@ionic-native/google-maps';
import { SettingsPage} from '../pages/settings/settings';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Calendar} from '@ionic-native/calendar';
import {EventCalendarComponent } from '../components/event-calendar/event-calendar';
import {AddnewjobPage} from '../pages/addnewjob/addnewjob';
import { CalendarModule  } from 'ionic3-calendar';
import { DatePicker } from '@ionic-native/date-picker';
@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    AddnewjobPage,
    EventCalendarComponent,
    SqlitePage,
    LoginPage,
    SettingsPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakershowPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SqlitePage, name: 'sqliter', segment: 'sqliter' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SettingsPage, name: 'SettingsPage', segment: 'Setting' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    SettingsPage,
    AboutPage,
    AccountPage,
    LoginPage,
    SpeakershowPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SqlitePage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    AddnewjobPage,
    TutorialPage,
    SupportPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    GoogleMaps,
    SQLite,
    NativeGeocoder,
    Broadcaster,
    DatabaseProvider,
    SQLitePorter,
    DatePicker,
    Calendar,
    LocalNotifications,
    SplashScreen
  ]
})
export class AppModule { }
