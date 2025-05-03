import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

  // convert from lat long to address
  reverseGeocode(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('format', 'json')
      .set('email', 'omarasmaa241@gmail.com'); // Important for Nominatim rules

    return this.http.get<any>(this.apiUrl, { params });
  }

  // covert from address to lat long
  geocode(address: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;
    return this.http.get(url);
  }
}
