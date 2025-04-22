import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymobService } from '../../services/payment/paymob.service';
import { PaypalService } from '../../services/payment/paypal.service';
import Swal from 'sweetalert2';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCreditCard,
  heroShieldCheck,
  heroCalendar,
  heroInformationCircle,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, NgIcon],
  templateUrl: './payment.component.html',
  viewProviders: [
    provideIcons({
      heroCreditCard,
      heroShieldCheck,
      heroCalendar,
      heroInformationCircle,
    }),
  ],
})
export class PaymentComponent {
  constructor(
    private paymobService: PaymobService,
    private paypalService: PaypalService
  ) {}

  selectedMethod: string = 'paypal';

  date: string = new Date().toDateString();
  ticketPrice: number = 120;
  serviceFee: number = 12.75;
  tax: number = 7.5;
  total: number = this.ticketPrice + this.serviceFee + this.tax;
  // cardDetails = {
  //   cardNumber: '',
  //   cardHolder: '',
  //   expiryDate: '',
  //   cvv: ''
  // };

  // billingData = {
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   phone_number: '',
  //   city: '',
  //   country: 'EG',
  //   street: '',
  //   building: '',
  //   floor: '',
  //   apartment: '',
  //   postal_code: ''
  // };

  async confirmPayment(event: Event) {
    event.preventDefault();

    if (this.selectedMethod === 'paypal') {
      try {
        console.log('Initializing PayPal...');
        const paypalInstance = await this.paypalService.initialize();

        if (!paypalInstance) {
          throw new Error('Failed to initialize PayPal SDK');
        }

        console.log('Creating payment for amount:', this.total);
        const paymentButtons = await this.paypalService.createPayment(
          this.total
        );

        const container = document.querySelector('#paypal-button-container');
        if (container) {
          container.innerHTML = '';
          console.log('Rendering PayPal button...');
          await paymentButtons.render('#paypal-button-container');
        } else {
          throw new Error('PayPal container not found');
        }
      } catch (error: Error | any) {
        console.error('Detailed PayPal error:', error);
        Swal.fire({
          title: 'Payment failed. Please try again.',
          text: 'Failed to initialize PayPal. Please refresh and try again.',
          icon: 'error',
        });
      }
    }
  }
}
