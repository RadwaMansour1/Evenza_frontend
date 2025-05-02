
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-success',
  templateUrl:"./success.component.html",
  imports:[CommonModule,TranslateModule]
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  barcodeImageSrc: string | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get('session_id');
    const tiketId = urlParams.get('tiketId');
    const paymentMethod = urlParams.get('payment_method') || 'stripe';
  
    try {
      const barcodeUrl = paymentMethod === 'stripe'
        ? `http://localhost:3000/payments/barcode/${tiketId}?payment_method=stripe`
        : `http://localhost:3000/payments/barcode/${tiketId}?payment_method=wallet`;
  
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