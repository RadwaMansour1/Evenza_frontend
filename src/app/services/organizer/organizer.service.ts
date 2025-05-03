import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../../constants';
import { TransferInfo, TransferInfoResponse } from '../../models/transfer-info.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  private apiUrl = 'http://localhost:3000/organizer';

  constructor(private httpClient: HttpClient) {}

  getOrganizerStatus(): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.get<any>(`${this.apiUrl}/status`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addEvent(eventData: any): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.post<any>(`${this.apiUrl}/events`, eventData, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getOrganizerEvents(): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.get<any>(`${this.apiUrl}/events`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getOrganizerWallet(): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.get<any>(`${this.apiUrl}/wallet`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateAndSaveTransferInfo(dto: TransferInfo): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.post<any>(`${this.apiUrl}/wallet/transfer-info`, dto, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getTransferInfo(): Observable<TransferInfoResponse> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    return this.httpClient.get<TransferInfoResponse>(`${this.apiUrl}/wallet/transfer-info`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
