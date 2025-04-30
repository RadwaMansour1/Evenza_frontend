import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  private apiUrl = 'http://localhost:3000/organizer';

  constructor(private httpClient: HttpClient) {}

  addEvent(eventData: any): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.post<any>(
      `${this.apiUrl}/events`,
      eventData,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getOrganizerEvents(): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.get<any>(`${this.apiUrl}/events`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
