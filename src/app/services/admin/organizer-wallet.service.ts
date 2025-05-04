import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizerWalletService {
  private baseUrl = 'http://localhost:3000/organizer/wallet';

  constructor(private http: HttpClient) {}

  getWallet(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getTransferInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transfer-info`);
  }

  updateTransferInfo(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/transfer-info`, data);
  }

  createTransaction(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/transaction`, data);
  }
}
