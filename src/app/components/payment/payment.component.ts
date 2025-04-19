import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {PaymobService} from "../paymob.service"

@Component({
  selector: 'app-payment',
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private paymobService: PaymobService) {}

  selectedMethod:string = "creditcard"

  cardDetails = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };

  billingData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: '',
    country: 'EG',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    postal_code: ''
  };

  async confirmPayment(ev:Event) {
    ev.preventDefault();
    try {
        let paymentResult;
        
        if (this.selectedMethod === 'creditcard') {
            paymentResult = await this.paymobService.processDirectCardPayment(
                100, // amount
                this.cardDetails,
                this.billingData
            );
        } else if (this.selectedMethod === 'paypal') {
            paymentResult = await this.paymobService.processDirectPayPalPayment(
                100, // amount
                this.billingData
            );
        } else {
            throw new Error('Invalid payment method selected');
        }

        if (paymentResult.success) {
            alert('Payment successful!');
        } else {
            alert('Payment failed. Please try again.');
        }
    } catch (error) {
        console.error('Payment error:', error);
        console.log('Error details:', JSON.stringify(error, null, 2));
        alert('An error occurred during payment.');
    }
}
}
