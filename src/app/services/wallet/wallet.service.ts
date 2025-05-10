import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WalletService{
    private apiUrl:string = "https://evenzabackend-production-2fb4.up.railway.app/wallet"
    constructor(private readonly http:HttpClient){}

    getTicketByUserId(userId:string):Observable<any>{
        return this.http.get(`${this.apiUrl}/${userId}`)
    }

    bookFromWallet(userId:string , amount:number):Observable<any>{
        return this.http.post(`${this.apiUrl}/book`,{userId,ticketPrice:amount})
    }

}
