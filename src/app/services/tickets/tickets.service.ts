import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketModel } from '../../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/tickets'; // Adjust this URL to match your backend

  constructor(private http: HttpClient) {}

  // Get all tickets
  getTickets(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.apiUrl);
  }

  // Get a ticket by ID
  getTicketById(ticketId: string): Observable<TicketModel> {
    return this.http.get<TicketModel>(`${this.apiUrl}/${ticketId}`);
  }

  getTicketByUserId(userId: string): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new ticket
  createTicket(ticketData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticketData);
  }

  // Delete a ticket by ID
  deleteTicket(ticketId: string): Observable<TicketModel> {
    return this.http.delete<TicketModel>(`${this.apiUrl}/${ticketId}`);
  }
}
