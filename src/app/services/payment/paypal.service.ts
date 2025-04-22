import { Injectable } from '@angular/core';
import { loadScript } from '@paypal/paypal-js';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private clientId = 'ARf0DlL-Sb3lSN93trFWF59lt_ADTgNHYUJHlIxmANwX3-KWvgBeaSKoky_qAvtOEhGPkvQDLgA0qK4d';

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
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2)
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture();
      }
    });
  }
}