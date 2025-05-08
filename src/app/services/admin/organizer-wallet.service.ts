import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface TransferInfo {
  _id?: string;
  organizerId: string;
  type: 'E-Wallet' | 'InstaPay' | 'Bank';
  accountNumber?: string;
  accountName?: string;
  walletPhoneNumber?: string;
  email?: string;
  createdAt?: Date;
}

export interface Transaction {
  _id?: string;
  organizerId: string;
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed';
  createdAt?: Date;
}

export interface OrganizerBalance {
  organizerId: string;
  name: string;
  availableBalance: number;
  TransferInfo: TransferInfo | null;
}

export interface CreateTransactionDto {
  organizerId: string;
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed';
}

@Injectable({
  providedIn: 'root'
})
export class OrganizerWalletService {
  private apiUrl = `http://localhost:3000/organizer/wallet`;

  constructor(private http: HttpClient) { }

  getAllOrganizersBalances(): Observable<OrganizerBalance[]> {
    return this.http.get<OrganizerBalance[]>(`${this.apiUrl}/all-balances`);
  }

  getOrganizerWallet(organizerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${organizerId}`);
  }

  getTransferInfo(organizerId: string): Observable<TransferInfo> {
    return this.http.get<TransferInfo>(`${this.apiUrl}/transfer-info/${organizerId}`);
  }

  createTransaction(transaction: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transaction`, transaction);
  }
}