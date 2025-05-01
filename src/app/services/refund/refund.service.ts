import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefundService{
    private apiOriginalUrl = "http://localhost:3000/payments/refund"
    private apiWalletUrl = "http://localhost:3000/wallet/refund"
    constructor(private http:HttpClient){}

     refundOriginal (transactionId: string, refundAmount:number,ticketId:string, reason?: string):Observable<any>{
        return this.http.post<any>(this.apiOriginalUrl,{
            transactionId,
            refundAmount,
            ticketId,
            reason
        });
    }

     refundToWallet (userId: string,transactionId:string, amount:number):Observable<any>{
        return this.http.post<any>(this.apiWalletUrl,{
            userId,
            transactionId,
            amount
        });
    }

}