import { plantData } from './../../shared/models/plantData';
import { Observable } from 'rxjs';
import { DATA_API_URL } from './../../shared/consts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaDataService {

  constructor(private http: HttpClient) { }

  public getPlantData( plantType: string ) {
    const url = DATA_API_URL.replace(':/TYPE:/', plantType);

    return this.http.get<any>(url);
  }

}
