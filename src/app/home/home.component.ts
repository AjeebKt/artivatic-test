import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { GlobalDataService } from '../core/services/global-data.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import {} from '@types/googlemaps';
declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  filteredData: any;
  filterPipeInstance = new FilterPipe();
  listFilter: any;
  cityList: any = [];

  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom = 15;

  lat = 51.673858;
  lng = 7.815982;
  zm = 15;
  geoCoder: any;
  address: string;

  constructor(
    private renderer: Renderer2,
    private gd: GlobalDataService,
    private router: Router,
    private hs: HomeService,
    private confirmDialogService: ConfirmModalService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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
    });
  }

  getLatLong(data) {
    this.hs.getLatLong(data).subscribe(res => {
      console.log(res);
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

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

}
