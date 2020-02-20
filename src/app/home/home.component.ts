import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { GlobalDataService } from '../core/services/global-data.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'underscore';
// import {} from '@types/googlemaps';
declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  cityList: any = [];
  latitude: number;
  longitude: number;
  zoom = 15;
  states: any;
  filteredCities: any;

  constructor(
    private hs: HomeService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getInit();
  }

  ngAfterViewInit() {
    this.setCurrentLocation();
  }

  getInit() {
    this.hs.getCities().subscribe(res => {
      this.cityList = res;
      this.states = _.uniq(this.cityList, 'State');
      this.states = _.sortBy(this.states, 'State');
    });
  }

  getLatLong(data) {
    this.hs.getLatLong(data).subscribe(res => {
      // console.log(res);
      if (res.results.length) {
        this.latitude = res.results[0].geometry.location.lat;
        this.longitude = res.results[0].geometry.location.lng;
      } else {
        this.snackBar.open(res.error_message, '', {
          duration: 4000
        });
      }
    });
  }

  loadCities(state) {
    this.filteredCities = _.filter(this.cityList, (item) => item.State === state.State);
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

}
