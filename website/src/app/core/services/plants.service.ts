import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PHOTOS_URL } from 'src/app/shared/consts';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http: HttpClient) { }

  public getPhotoList(plantType: string) {
    const url = PHOTOS_URL.replace(':/TYPE:/', plantType);
    console.log("URL: ",url);

    return this.http.get(url);
  }

}

