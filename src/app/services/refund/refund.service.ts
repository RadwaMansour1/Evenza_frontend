import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefundService{
    private apiUrl = "https://evenzabackend-production-2fb4.up.railway.app/refunds"
    private apiOriginalUrl = "https://evenzabackend-production-2fb4.up.railway.app/payments/refund"
    private apiWalletUrl = "https://evenzabackend-production-2fb4.up.railway.app/refunds/wallet";

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

    createRefund(paymentId:string , refundAmount:number):Observable<{paymentId:string , refundAmount:number}>{
        return this.http.post<{paymentId:string, refundAmount:number}>(this.apiUrl,{
            paymentId,
            refundAmount
        });
    }


}
