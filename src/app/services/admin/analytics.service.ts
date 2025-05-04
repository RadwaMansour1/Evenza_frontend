import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TopEvent {
  eventName: string;
  ticketsSold: number;
  totalRevenue: number;
  levels: string[];
}

export interface AnalyticsData {
  totalEvents: number;
  totalOrders: number;
  totalRevenue: number;
  avgSatisfaction: number;
  topEvents: TopEvent[];
}

export interface AnalyticsResponse {
  data: AnalyticsData;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/admin/analytics';

  constructor(private http: HttpClient) {}

  getAnalytics(): Observable<AnalyticsResponse> {
    return this.http.get<AnalyticsResponse>(this.apiUrl);
  }
}