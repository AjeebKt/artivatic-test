import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getCities(): Observable<any> {
    return this.http.get('/cities');
  }
  getLatLong(qry): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${qry.City}+${qry.District}+${qry.State}&key=AIzaSyDi3wWSEFdcd3NQ1zgY7k_5RjjYpDmgAnk`);
  }
}
