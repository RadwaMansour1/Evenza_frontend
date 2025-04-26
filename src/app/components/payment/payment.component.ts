import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  PaymobService  } from '../../services/payment/paymob.service';;
import { PaypalService } from '../../services/payment/paypal.service';
import Swal from 'sweetalert2';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCreditCard, heroShieldCheck, heroCalendar, heroInformationCircle } from '@ng-icons/heroicons/outline';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, NgIcon],
  templateUrl: './payment.component.html',
  viewProviders:  [
    provideIcons({ 
      heroCreditCard, 
      heroShieldCheck, 
      heroCalendar, 
      heroInformationCircle ,
    }),
  ],
})
export class PaymentComponent implements OnInit { // Implement OnInit
  constructor(
    private paymobService: PaymobService, 
    private paypalService: PaypalService,private stripeService:StripeService
  ) { }

  selectedMethod:  string = 'paypal';; // Default selection




  date: string = new Date().toDateString();
  ticketPrice:  number = 110.0;
  serviceFee:  number = 12.75;
  tax:  number = 7.5;
  total:  number = this.ticketPrice + this.serviceFee + this.tax;
  userId: string = "user4";
  eventId: string ="event2";
  ticketType: string = "GA";
  quantity: number = 1;
  

  payWithStripe() {
    console.log('Stripe button clicked');
    this.stripeService.checkout(this.total,this.userId,this.eventId,this.ticketType,this.quantity);
  } 

  ngOnInit(): void {
    // If PayPal is the default method, render the buttons on load
    if (this.selectedMethod === 'paypal') {
      this.renderPayPalButtons();
    }
  }

  // Method triggered when payment method changes
  onPaymentMethodChange(method: string): void {
    if (method === 'paypal') {
      this.renderPayPalButtons();
    } else {
      // Optionally clear the PayPal container if switching away
      const container = document.querySelector('#paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }
    }
  }

  // Extracted logic for rendering PayPal buttons
  private async renderPayPalButtons(): Promise<void> {
    // Ensure the container exists in the DOM first
    // Use setTimeout to wait for Angular's change detection cycle
    setTimeout(async () => {
      try {
        console.log('Initializing PayPal...');
        const paypalInstance = await this.paypalService.initialize();
        console.log(`paypal instance: ${paypalInstance}`);

        if (!paypalInstance) {
          throw new Error('Failed to initialize PayPal SDK');
        }

        console.log('Creating payment for amount:', this.total);
        const paymentButtons = await this.paypalService.createPayment(this.total);

        const container = document.querySelector('#paypal-button-container');
        if (container) {
          container.innerHTML = ''; // Clear previous buttons first
          console.log('Rendering PayPal button...');
          await paymentButtons.render('#paypal-button-container');
        } else {
          // This might happen if the @if block hasn't rendered yet
          console.warn('PayPal container not found during render attempt. May need adjustment.');
          // Consider retrying or ensuring the container exists before calling this.
        }

      } catch (error: Error | any) {
        console.error('Detailed PayPal error:', error);
        Swal.fire({
          title: "Payment setup failed.",
          text: "Could not set up PayPal buttons. Please refresh or select another method.",
          icon: "error"
        });
      }
    }, 0); // setTimeout ensures DOM is updated
  }

  // This method is now primarily for the Evenza Wallet button click
  async confirmPayment(event?: Event): Promise<void> { // Make event optional
    event?.preventDefault(); // Prevent default only if event exists

    if (this.selectedMethod === 'evenza') {
      // Handle Evenza wallet payment logic here
      console.log('Paying with Evenza Wallet...');
      // Example: Show success/failure message
      Swal.fire({
        title: "Wallet Payment",
        text: "Wallet payment functionality not yet implemented.",
        icon: "info"
      });
    }
    // PayPal logic is now handled by renderPayPalButtons via onPaymentMethodChange
  }
}
