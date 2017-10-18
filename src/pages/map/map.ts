import { Component, ViewChild, ElementRef,NgModule } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import {GoogleMaps,GoogleMap,GoogleMapsEvent, GoogleMapOptions,CameraPosition,MarkerOptions,  Marker} from '@ionic-native/google-maps';
 
import { Platform ,NavController, NavParams } from 'ionic-angular';

declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('mymaps') eRef:ElementRef;
  constructor(public navCtrl: NavController, private navParam: NavParams) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap(){
    const location = new google.maps.LatLng('20.429117','106.170969');
    const options = {
      center: location,
      zoom:10
    };
    const map = new google.maps.Map(this.eRef.nativeElement,options);
  }
 
}
