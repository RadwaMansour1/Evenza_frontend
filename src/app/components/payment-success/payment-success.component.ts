
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import Swal from 'sweetalert2';
// import { RouterModule } from '@angular/router';

// interface StripeSessionResponse {
//   payment_status: string;
//   amount_total: number;
//   currency: string;
//   customer_email: string;
//   id: string;
// }

// @Component({
//   selector: 'app-payment-success',
//   imports: [RouterModule],
//   template: `
//     <div class="flex flex-col items-center justify-center h-screen">
//       <h1 class="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
//       <p class="text-lg mb-6">Thank you for your purchase. Your payment was completed and saved successfully.</p>
//       <a routerLink="/" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer">Go to Home</a>
//     </div>
//   `})
// export class PaymentSuccessComponent implements OnInit {
//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit() {
//     // this.route.queryParams.subscribe(params => {
//     //   const sessionId = params['session_id'];
//     //   console.log("session id: ", sessionId);
//     //   if (sessionId) {
//     //     this.verifyPayment(sessionId);
//     //   }
//     // });
//   }

//   verifyPayment(sessionId: string) {
//     console.log("start verify payment");
//     this.http.get<StripeSessionResponse>(`http://localhost:3000/payments/checkout-session?session_id=${sessionId}`)
//       .subscribe({
//         next: (res) => {
//           console.log('Stripe payment status response:', res);
//           if (res.payment_status === 'paid') {
//             const paymentData = {
//               userId: '1', // Replace with actual user ID
//               eventId: '4', // Replace with actual event ID
//               ticketType: 'VIP', // Replace with actual ticket type
//               quantity: 1, // Replace with actual quantity
//               amountPaid: res.amount_total / 100, // Stripe returns amount in cents
//               currency: res.currency.toUpperCase(),
//               transactionId: res.id,
//               paymentMethod: 'Stripe',
//               completedAt: new Date()
//             };

//             // Save payment data to your backend
//             this.http.post('http://localhost:3000/payments', paymentData).subscribe({
//               next: () => {
//                 Swal.fire({
//                   title: 'Payment Successful!',
//                   text: 'Your payment was completed and saved successfully.',
//                   icon: 'success'
//                 });
//               },
//               error: (err) => {
//                 console.error('Error saving payment:', err);
//                 Swal.fire({
//                   title: 'Error',
//                   text: 'Failed to save payment details.',
//                   icon: 'error'
//                 });
//               }
//             });
//           } else {
//             Swal.fire({
//               title: 'Payment Not Completed',
//               text: 'Your payment was not successful.',
//               icon: 'error'
//             });
//           }
//         },
//         error: (err) => {
//           console.error("Stripe payment error: ", err);
//           Swal.fire({
//             title: 'Error',
//             text: err.message,
//             icon: 'error'
//           });
//         }
//       });
//   }
// }
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl:"./success.component.html",
  imports:[CommonModule]
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;
  barcodeImageSrc: string | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    // استخراج session_id من رابط الصفحة
    const urlParams = new URLSearchParams(window.location.search);
    this.sessionId = urlParams.get('session_id');

    if (this.sessionId) {
      try {
        // طلب لخادمك للحصول على الباركود
        const blob = await this.http
          .get(`http://localhost:3000/payments/barcode/${this.sessionId}`, { responseType: 'blob' })
          .toPromise();

        // Check if blob is defined
        if (blob) {
          // تحويل الصورة إلى رابط للعرض
          this.barcodeImageSrc = window.URL.createObjectURL(blob);
        } else {
          console.error('Failed to retrieve barcode image.');
        }
      } catch (error) {
        console.error('Error fetching barcode:', error);
      }
    }
  }
}