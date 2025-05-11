// src/app/core/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DashboardResponse {
  timestamp: string;
  data: {
    totalSales: number;
    totalEvents: number;
    totalOrders: number;
    totalUsers: number;
  }
}

interface RevenueResponse {
  _id: string; // Date string
  totalRevenue: number;
}

interface PopularEventResponse {
  _id: string;
  bookingCount: number;
  event: {
    title: string;
    category: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/admin';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardData(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.apiUrl}/dashboard`);  }


  // Events
  approveEvent(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/events/${id}/approve`, {});
  }

  editEvent(id: string, eventData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/events/${id}/edit`, eventData);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/events/${id}/delete`);
  }

  // Users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  banUser(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/ban`, {});
  }

  reactivateUser(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reactivate`, {});
  }

  // Categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  createCategory(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, { name });
  }

  updateCategory(id: string, name: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/categories/${id}`, { name });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  // Analytics
  getRevenueReport(): Observable<any> {
    return this.http.get<RevenueResponse[]>(`${this.apiUrl}/analytics/revenue`);
  }

  getPopularEvents(): Observable<any> {
    return this.http.get<PopularEventResponse[]>(`${this.apiUrl}/analytics/popular-events`);
  }

  getUserTrends(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics/user-trends`);
  }
}
