import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakershowPage } from './speakershow';

@NgModule({
  declarations: [
    SpeakershowPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakershowPage),
  ],
})
export class SpeakershowPageModule {}
