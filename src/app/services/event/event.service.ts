import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCriteria } from '../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) {}

  // Modified to accept filters and pagination
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

    console.log('Fetching events with params:', params.toString());

    return this.httpClient.get<any>(`${this.apiUrl}/events`, { params });
  }

  getEventById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/events/${id}`);
  }

  addEvent(eventData: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/organizer/events`,
      eventData,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  }
}
