import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCriteria } from '../../models/event.model';
import { CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app';

  constructor(private httpClient: HttpClient) {}

  getEvents(
    page: number = 1,
    limit: number = 6,
    filters: FilterCriteria = {}
  ): Observable<any> {
    let params = new HttpParams();

    console.log(filters);
    // Add pagination parameters
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    // Add filter parameters if they exist and are not 'All' or null/undefined
    if (filters.search) params = params.append('search', filters.search);
    if (filters.category && filters.category !== 'All')
      params = params.append('category', filters.category);
    if (filters.minPrice !== null && filters.minPrice !== undefined)
      params = params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== null && filters.maxPrice !== undefined)
      params = params.append('maxPrice', filters.maxPrice.toString());
    if (filters.isFree !== null && filters.isFree !== undefined)
      params = params.append('isFree', filters.isFree.toString());
    if (filters.city && filters.city !== 'All')
      params = params.append('city', filters.city);
    if (filters.dateFrom) params = params.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) params = params.append('dateTo', filters.dateTo);
    if (filters.sortBy) params = params.append('sortBy', filters.sortBy);
    if (filters.sortOrder)
      params = params = params.append('sortOrder', filters.sortOrder);

    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log(decodedToken);
      if (decodedToken) {
        params = params.append('userId', decodedToken.id);
      }
    }
    console.log('Fetching events with params:', params.toString());

    return this.httpClient.get<any>(`${this.apiUrl}/events`, { params });
  }

  getEventById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/events/${id}`);
  }

  getFeaturedEvents(): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken) {
        return this.httpClient.get<any>(
          `${this.apiUrl}/events/featured?userId=${decodedToken.id}`
        );
      }
    }
    return this.httpClient.get<any>(`${this.apiUrl}/events/featured`);
  }

  getFreeTicket(data: any): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.post<any>(`${this.apiUrl}/tickets/free`, data, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  hasFreeTicket(eventId: any): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.get<any>(
      `${this.apiUrl}/tickets/hasFreeTicket/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
