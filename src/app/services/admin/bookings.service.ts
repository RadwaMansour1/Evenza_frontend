import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Booking {
  _id: string;
  userId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  countOfTickets: number;
  orderDetails: {
    eventId: {
      _id: string;
      title?: string;
      name?: string;  // Make name optional since it might not be populated
    } | string;  // Can be either object or string depending on population
    level: string;
    numberOfTickets: number;
    totalPrice: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private apiUrl = 'http://localhost:3000/admin/orders';
  private eventsUrl = 'http://localhost:3000/events'; 

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map((response: any) => {
        if (!response || !response.data) {
          return [];
        }
        
        return response.data.map((booking: any) => ({
          ...booking,
          userId: booking.userId ? {
            _id: booking.userId._id,
            firstName: booking.userId.firstName || '',
            lastName: booking.userId.lastName || '',
            email: booking.userId.email || 'No email available'
          } : null,
          orderDetails: booking.orderDetails ? booking.orderDetails.map((detail: any) => ({
            ...detail,
            eventName: detail.eventId && typeof detail.eventId === 'object' ? 
              (detail.eventId.title || detail.eventId.name || 'Event not found') : 
              'Event not found'
          })) : []
        }));
      })
    );
  }

  updateBookingStatus(id: string, status: string): Observable<Booking> {
    return this.http.patch<{ data: Booking }>(
      `${this.apiUrl}/${id}/status`,
      { status }
    ).pipe(
      map(response => response.data)
    );
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEventDetails(eventId: string): Observable<any> {
    return this.http.get(`${this.eventsUrl}/${eventId}`);
  }

  // Helper method to check if eventId is populated
  isEventPopulated(eventId: any): eventId is { _id: string; name: string } {
    return typeof eventId === 'object' && eventId !== null && 'name' in eventId;
  }
}