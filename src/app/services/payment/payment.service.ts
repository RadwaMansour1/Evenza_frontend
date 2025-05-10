import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaymentModel } from "../../models/payment.model";

@Injectable({
    providedIn:"root"
})
export class PaymentService{
    private apiUrl = "https://evenzabackend-production-2fb4.up.railway.app/payments"
    constructor(private readonly http:HttpClient){}

    getAllPayments():Observable<PaymentModel[]>{
        return this.http.get<PaymentModel[]>(this.apiUrl)
    }

    getPaymentById(id:string):Observable<PaymentModel>{
        return this.http.get<PaymentModel>(`${this.apiUrl}/${id}`)
    }

    getPaymentsByUserId(userId:string):Observable<PaymentModel[]>{
        return this.http.get<PaymentModel[]>(`${this.apiUrl}/user/${userId}`)
    }

    createPayment(payment:PaymentModel):Observable<PaymentModel>{
        return this.http.post<PaymentModel>(this.apiUrl,payment)
    }

    updateStatus(paymentId:string,status:string):Observable<any>{
        return this.http.patch(`${this.apiUrl}/updateStatus`,{paymentId , status})
    }
}
