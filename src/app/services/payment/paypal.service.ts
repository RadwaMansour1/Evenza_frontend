import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { loadScript } from '@paypal/paypal-js';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs'; // Import for converting Observable to Promise

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private clientId = 'ARf0DlL-Sb3lSN93trFWF59lt_ADTgNHYUJHlIxmANwX3-KWvgBeaSKoky_qAvtOEhGPkvQDLgA0qK4d';
  // Adjust the URL to your NestJS backend endpoint
  private backendVerifyUrl = 'https://evenzabackend-production-2fb4.up.railway.app/payments/paypal/verify';

  // Inject HttpClient
  constructor(private http: HttpClient) {}

  async initialize() {
    try {
      return await loadScript({
        clientId: this.clientId,
        currency: 'USD'
      });
    } catch (error) {
      throw new Error('Failed to initialize PayPal SDK');
    }
  }

  async createPayment(amount: number) {
    const paypal = await this.initialize();
    if (!paypal || !paypal.Buttons) {
      throw new Error('PayPal SDK not properly initialized');
    }

    return paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        console.log('Creating order...');
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2)
            }
          }]
        }).then((orderID: string) => {
          console.log('Order created with ID:', orderID);
          return orderID;
        });
      },

      onApprove: async (data: any, actions: any) => {
        console.log('onApprove triggered. Data:', data);
        let order; // Declare order variable outside try block
        try {
          console.log(`Attempting to capture payment for Order ID: ${data.orderID}`);
          // Remove the inner try...catch. Let the outer catch handle capture errors.
          order = await actions.order.capture(); // Capture the order
          console.log('PayPal capture successful:', order);

          // This part now only runs if capture() was successful
          // **Backend Verification Step**
          console.log(`Sending Order ID ${order.id} to NestJS backend for verification...`);
          const verificationPayload = { orderId: order.id };
          const verificationResponse = await firstValueFrom(
            this.http.post<{ success: boolean, message?: string }>(this.backendVerifyUrl, verificationPayload)
          );

          console.log('Backend verification response:', verificationResponse);

          if (verificationResponse && verificationResponse.success) {
            // Prepare the payment data object
            const paymentData = {
              userId: 'USER_ID_HERE', // Replace with actual user ID from your app context
              eventId: 'EVENT_ID_HERE', // Replace with actual event ID
              ticketType: 'TICKET_TYPE_HERE', // Replace with actual ticket type
              quantity: 1, // Replace with actual quantity
              amountPaid: order.purchase_units?.[0]?.amount?.value ? Number(order.purchase_units[0].amount.value) : 0,
              currency: order.purchase_units?.[0]?.amount?.currency_code || 'USD',
              transactionId: order.id,
              paymentMethod: 'PayPal',
              completedAt: new Date()
            };

            // Call your backend to save the payment data
            await firstValueFrom(
              this.http.post('https://evenzabackend-production-2fb4.up.railway.app/payments', paymentData)
            );

            Swal.fire({
              title: "Payment Successful!",
              text: `Your payment for order ${order.id} has been confirmed.`,
              icon: "success"
            });
            // **TODO:** Add logic here to navigate user or update UI further
            // e.g., this.router.navigate(['/booking-success']);

          } else {
            // Backend verification failed
            throw new Error(verificationResponse?.message || 'Backend verification failed. Please contact support.');
          }

          return order; // Return the captured order details if needed elsewhere

        } catch (error: any) {
          // This outer catch block will now handle errors from capture() AND backend verification
          console.error('Error during payment approval or verification:', error);

          // Determine the error source
          let errorMessage = "An unexpected error occurred. Please contact support.";
          // Check if the error object has details from PayPal capture failure
          if (error.message && error.message.includes('capture')) { // Basic check, PayPal error objects might have more details
              errorMessage = `Failed to capture PayPal payment: ${error.message}. Please try again or contact support.`;
          } else if (error.message && error.message.includes('Backend verification failed')) {
             errorMessage = error.message; // Use the specific message from backend failure
          } else if (order && order.id) {
             // Error likely during backend call after successful capture
             errorMessage = `Payment captured (Order ${order.id}), but verification failed. Please contact support.`;
          } else {
             // Generic capture/verification error
             errorMessage = "There was an error processing your payment. Please try again or contact support.";
          }


          // Show failure alert
          Swal.fire({
            title: "Payment Processing Error",
            text: errorMessage,
            icon: "error"
          });

          // Rethrow or handle the error as needed
          throw error; // It's often good to rethrow so the SDK knows about the failure
        }
      },
      onError: (err: any) => {
        // This handler is for errors originating directly from the button SDK itself (less common)
        console.error('PayPal Button SDK Error:', err);
        Swal.fire({
          title: "PayPal Button Error",
          text: `A problem occurred with the PayPal button interface: ${err.message}`,
          icon: "error"
        });
      }
    });
  }
}
