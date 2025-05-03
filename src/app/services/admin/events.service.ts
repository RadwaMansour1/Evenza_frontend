// src/app/core/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TicketLevel {
  level: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface EventCoordinates {
  latitude: number;
  longitude: number;
}

export interface EventLocation {
  address: string;
  city: string;
  coordinates: EventCoordinates;
}

export interface Event {
  _id: string;
  eventHighlights: string[];
  title: string;
  description: string;
  date: string;
  time: string;
  location: EventLocation;
  category: string;
  ticketsAvailable: TicketLevel[];
  isFree: boolean;
  isApproved: boolean;
  imageUrl: string;
  organizerId: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private apiUrl = 'http://localhost:3000/admin/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<{ data: Event[] }>(this.apiUrl).pipe(
      map(response => response.data),
      map(events => events.map(event => ({
        ...event,
        // Add organizer name based on organizerId if needed
        organizer: this.getOrganizerName(event.organizerId)
      })))
    );
  }
  getEventById(id: string): Observable<Event> {
    return this.http.get<{ data: Event }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),

    );
  }
  approveEvent(eventId: string): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${eventId}/approve`, {});
  }

  updateEventStatus(id: string, status: 'approved' | 'rejected'): Observable<Event> {
    return this.http.patch<{ data: Event }>(
     `http://localhost:3000/admin/events/${id}/approve`, 
      { status }
    ).pipe(
      map(response => response.data)
    );
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/admin/events/${id}/delete`);
  }

  private getOrganizerName(organizerId: number): string {
    // Replace with actual organizer mapping logic
    const organizers: { [key: number]: string } = {
      1: 'John Organizer',
      2: 'Charlie Puth'
    };
    return organizers[organizerId] || 'Unknown Organizer';
  }
  getEventsByIds(ids: string[]): Observable<{_id: string, title: string}[]> {
    if (!ids.length) return of([]);
    return this.http.get<{data: any[]}>(`${this.apiUrl}?ids=${ids.join(',')}`).pipe(
      map(response => response.data.map(e => ({
        _id: e._id.$oid || e._id,
        title: e.title
      })))
    );
  }
  editEvent(id: string, eventData: Partial<Event>): Observable<Event> {
    return this.http.patch<{ data: Event }>(`${this.apiUrl}/${id}/edit`, eventData).pipe(
      map(response => response.data)
    );
  }
}