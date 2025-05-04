// src/app/core/services/organizer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private apiUrl = 'http://localhost:3000/organizer';

  constructor(private http: HttpClient) {}

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, eventData);
  }

  uploadDocument(fileUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-document`, { fileUrl });
  }
}