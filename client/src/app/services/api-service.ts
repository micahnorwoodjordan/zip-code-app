import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/development';
import { GeoData } from '../interfaces/GeoData';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getZipCodeData(zipCode: string) {
    let url: string = `${environment.baseURL}/${zipCode}`;
    return this.httpClient.get<GeoData>(url, { responseType: 'json' });
  }
}
