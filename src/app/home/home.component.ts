import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { GlobalDataService } from '../core/services/global-data.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filteredData: any;
  filterPipeInstance = new FilterPipe();
  listFilter: any;
  cityList: any = [];

  constructor(
    private renderer: Renderer2,
    private gd: GlobalDataService,
    private router: Router,
    private hs: HomeService,
    private confirmDialogService: ConfirmModalService,
  ) {
  }



  ngOnInit() {
    this.getInit();
  }

  getInit() {
    this.hs.getCities().subscribe(res => {
      console.log('City ============>>');
      console.log(res);

      this.cityList = res;
    });
  }

}
