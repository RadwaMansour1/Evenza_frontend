import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe('pk_test_51RHNk4DIgLx0mkszl4K2yt42Lt685HKzlaJKEYCEmvIynsYVns09fADYP1rt0aWK3Ipve9N6UDiVnRP5wjrEzZKd009Pw3H5RX');

  constructor(private http: HttpClient) {}

// Updated frontend handling for wrapped responses
async checkout(amount: number, userId: string, eventId: string, ticketType: string, quantity: number) {
  try {
    const stripe = await this.stripePromise;
    if (!stripe) return;

    // Handle wrapped response format
    const response = await this.http.post<{ 
      timestamp: string, 
      data: { id: string } 
    }>('http://localhost:3000/payments/create-checkout-session', { 
       amount, userId, eventId, ticketType, quantity 
    }).toPromise();

    console.log('Stripe session:', response);

    const sessionId = response?.data?.id;
    if (sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    } else {
      console.log('No session ID in response:', response);
    }
  } catch (err) {
    console.log('Stripe checkout error:', err);
  }
}
}