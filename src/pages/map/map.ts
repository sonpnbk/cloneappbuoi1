import { Component, ViewChild, ElementRef,NgModule } from '@angular/core';

import {GoogleMaps,GoogleMap,GoogleMapsEvent, GoogleMapOptions,CameraPosition,MarkerOptions ,  Marker} from '@ionic-native/google-maps';
 
import { Platform ,NavController, NavParams,AlertController } from 'ionic-angular';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
declare var google; 

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: GoogleMap;
  @ViewChild('tAddress') address:any;
   markerOptions:MarkerOptions;
  mapElement: HTMLElement;
  constructor(private nativeGeocoder: NativeGeocoder,public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }
  
  loadMap(lat:any,long:any){
 
    this.mapElement = document.getElementById('map');
    
        let mapOptions: GoogleMapOptions = {
          camera: {
            zoom: 4,
            tilt: 30
          }
        };
      this.markerOptions = {
          title: this.address.value,
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: lat,
            lng: long
          }
        }
        this.map = this.googleMaps.create(this.mapElement, mapOptions);
         // Now you can use all methods safely.
         this.map.addMarker(this.markerOptions)
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert(this.markerOptions.title.valueOf);
            });
        });
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log(lat+'--'+long);
            console.log('Map is ready!');
           
    
          });
  }
  findAddress(){
    this.nativeGeocoder.forwardGeocode(this.address.value)
    .then((coordinates: NativeGeocoderForwardResult) =>{
      console.log(coordinates.latitude+'-'+coordinates.longitude);
      this.loadMap(coordinates.latitude,coordinates.longitude);
    }
    )
    .catch((error: any) => console.log(error));
    
  }
}
