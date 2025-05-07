
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefundsRequestsService {

  private apiUrl = "http://localhost:3000/refundsRequests"
  constructor(private readonly http:HttpClient) {}

  getRefundsRequests():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getRefundsRequestsById(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  getRefundsRequestsByUserId(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${id}`)
  }

  updateStatus(id:string,status:string):Observable<any>{
    return this.http.patch(`${this.apiUrl}/${id}`,{status})
  }

  createRefundRequest(userId:string , paymentId:string , ticketId:string , refundMethod:string , reason:string ,refundAmount:number):Observable<any>{
    return this.http.post(`${this.apiUrl}`,{
      userId,
      paymentId,
      ticketId,
      refundMethod,
      reason,
      refundAmount
    })
  }


}
