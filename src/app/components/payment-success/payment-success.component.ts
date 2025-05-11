
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TicketsService } from '../../services/tickets/tickets.service';
import { UserService } from '../../services/profile/user.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: "./success.component.html",
  imports: [CommonModule, TranslateModule]
})
export class PaymentSuccessComponent implements OnInit {
  barcodeImageSrc: string | null = null;

  constructor(private http: HttpClient, private readonly ticketService:TicketsService,private readonly userService:UserService) {}

  async ngOnInit(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    let ticketId = urlParams.get('ticketId');
    const paymentMethod = urlParams.get('payment_method') || 'stripe';

    if(!ticketId){
      this.userService.getProfile().subscribe({
        next:(res)=>{
          const userId = res.data._id;
          this.ticketService.getTicketByUserId(userId).subscribe({
            next:(res:any)=>{
              const tickets = res.data;
              console.log("user tickets ",tickets);
              ticketId = tickets[tickets.length-1]._id;
            },
            error:(err)=>{
              console.log(err)
            }
          })
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

    try {
      console.log({
        tiketId:ticketId
      })

      // const barcodeUrl =paymentMethod === "stripe" ?
      // `https://evenzabackend-production-2fb4.up.railway.app/payments/barcode/${orderId}/${ticketId}?payment_method=${paymentMethod}`
      // :
      // `https://evenzabackend-production-2fb4.up.railway.app/payments/barcode/${orderId}/${ticketId}?payment_method=${paymentMethod}`;

      const barcodeUrl =`https://evenzabackend-production-2fb4.up.railway.app/payments/barcode/${ticketId}?payment_method=${paymentMethod}`;


      const blob = await this.http.get(barcodeUrl, { responseType: 'blob' }).toPromise();

      if (blob) {
        this.barcodeImageSrc = window.URL.createObjectURL(blob);
      } else {
        console.error('Failed to retrieve QR code image.');
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  }
}
