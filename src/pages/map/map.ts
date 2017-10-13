import { Component, ViewChild, ElementRef,NgModule } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import {GoogleMaps,GoogleMap,GoogleMapsEvent, GoogleMapOptions,CameraPosition,MarkerOptions,  Marker} from '@ionic-native/google-maps';
 
import { Platform ,NavController } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platfrom:Platform) {
    platfrom.ready().then(() => {
      this.loadMap();
    });
  }
 
  loadMap() {
     let mapElement: HTMLElement = document.getElementById('map');
     
     let mapOptions: GoogleMapOptions = {
       camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
     };
 
     let map = this.googleMaps.create(mapElement,mapOptions);
 
     // Wait the MAP_READY before using any methods.
     map.one(GoogleMapsEvent.MAP_READY)
       .then(() => {
         console.log('Map is ready!');
 
         // Now you can use all methods safely.
         map.addMarker({
             title: 'Ionic',
             icon: 'blue',
             animation: 'DROP',
             position: {
               lat: 43.0741904,
               lng: -89.3809802
             }
           })
           .then(marker => {
             marker.on(GoogleMapsEvent.MARKER_CLICK)
               .subscribe(() => {
                 alert('clicked');
               });
           });
 
       });
   }
}
