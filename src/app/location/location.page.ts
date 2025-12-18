import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { interval, Subscription } from 'rxjs';
import { FoodserviceService } from '../foodservice.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, OnDestroy {

  lat: number = 0;
  lon: number = 0;
  markerLokasi: any;
  timerSubscription: Subscription | undefined;
  isInit = false;

  markerTeman: any;
  lat2 = 0.0;
  lon2 = 0.0;
  friendUsername = "user1";

  map: any;

  constructor(private foodservice: FoodserviceService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.getCoordinates()


  }

  startTimer() {
    this.timerSubscription = interval(5000).subscribe(() => {
      this.getCoordinates();
    });
  }




  initializeMap() {
    // Create a map centered at a specific location 
    this.map = L.map('map').setView([this.lat, this.lon], 13);
    // Add a gmap street tile layer (you may use other providers, like bing OpenStreetMap, mapbox, etc.. )
    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
    );
    googleStreets.addTo(this.map)

    var markerIcon = L.icon({
      iconUrl: 'https://toppng.com/uploads/preview/in-location-map-icon-navigation-symbol-ma-google-maps-marker-blue-11562916561qaf3tyejum.png', iconSize: [50, 50],
      iconAnchor: [25, 50],
    });
    this.markerLokasi = L.marker([this.lat, this.lon], { icon: markerIcon })
    this.markerLokasi.addTo(this.map);
    this.markerTeman=L.marker([this.lat2, this.lon2], {icon: markerIcon}) 
this.markerTeman.addTo(this.map);


  }

  moving() {
    // Update own location on server
    this.foodservice.updateLocation(this.appComponent.fullname, this.lat, this.lon).subscribe();
    
    // Update own marker
    this.markerLokasi.setLatLng([this.lat, this.lon]);
    
    // Get friend's location from server
    this.foodservice.getLocation(this.friendUsername).subscribe((data) => {
      if (data.result === 'success') {
        this.markerTeman.setLatLng([data.y, data.x]);
      }
    });
  }



  
  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        if (!this.isInit) {
          this.initializeMap()
          this.isInit = true
          this.startTimer()
        }
        else {
          this.moving()
        }

      },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
