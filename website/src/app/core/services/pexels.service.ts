import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_KEY } from "src/app/shared/consts";
import { Observable } from "rxjs";

const httpHeader = {
  headers: new HttpHeaders({
    Authorization: API_KEY,
  }),
};

@Injectable({
  providedIn: "root",
})
export class PexelsService {
  constructor(private http: HttpClient) {}

  getPhotos(search: string, perPage: number): Observable<any> {
    var url =
      "https://api.pexels.com/v1/search?query=" +
      search +
      "&per_page=" +
      perPage;
    return this.http.get(url, httpHeader);
  }
}
