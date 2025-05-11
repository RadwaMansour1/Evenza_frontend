import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderPayload, Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/orders';

  constructor(private http: HttpClient) {}

  getAllOrdersByAdmin(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/admin`);
  }

  getOrdersByOrganizer(organizerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/organizer/${organizerId}`);
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  createOrder(orderData: Partial<CreateOrderPayload>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  confirmPayment(orderId: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/confirm-payment/${orderId}`, {});
  }

  updateOrder(orderId: string, updateData: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}`, updateData);
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
}
