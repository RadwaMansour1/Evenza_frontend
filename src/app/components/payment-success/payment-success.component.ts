
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: "./success.component.html",
  imports: [CommonModule, TranslateModule]
})
export class PaymentSuccessComponent implements OnInit {
  barcodeImageSrc: string | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const orderId = urlParams.get('orderId');
    const ticketId = urlParams.get('ticketId');
    const paymentMethod = urlParams.get('payment_method') || 'stripe';

    try {
      console.log({
        orderId:orderId,
        tiketId:ticketId
      })

      // const barcodeUrl =paymentMethod === "stripe" ?
      // `http://localhost:3000/payments/barcode/${orderId}/${ticketId}?payment_method=${paymentMethod}`
      // :
      // `http://localhost:3000/payments/barcode/${orderId}/${ticketId}?payment_method=${paymentMethod}`;

      const barcodeUrl =`http://localhost:3000/payments/barcode/${orderId}/${ticketId}?payment_method=${paymentMethod}`;


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