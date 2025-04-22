import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getEvents(page: number = 1): Observable<any> {
    console.log('Fetching events from API...');
    return this.httpClient.get<any>(`${this.apiUrl}/events?page=${page}&limit=6`);
  }
}
