import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarjobPage } from './calendarjob';

@NgModule({
  declarations: [
    CalendarjobPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarjobPage),
  ],
})
export class CalendarjobPageModule {}
