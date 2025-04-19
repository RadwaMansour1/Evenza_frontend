import { Injectable } from "@angular/core";
import axios from"axios";

@Injectable({
  providedIn: 'root'
})
export class PaymobService{
    private API_KEY ="ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBek9EUXpOQ3dpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS43dFJZSklRV1luaWlDc25zTEtIS2c3NTV6a0ZvVXhtMW9EMEgxS0Y5eURaMXNnYTZHRnpCUUVNVUh4RU1abDBCVXRTdU1RbFRfU3MwMk5sMlhLWDVRdw=="
    private CARD_IFRAME_ID = '5058415';
    private PAYPAL_IFRAME_ID = 'YOUR_PAYPAL_IFRAME_ID';

    async getAuthToken(){
        const response = await axios.post("https://accept.paymob.com/api/auth/tokens",
            {
                "api_key":this.API_KEY
            }
        )
        return response.data.token;
    }

    async createOrder(amount:number,authToken:string){
        const response = await axios.post("https://accept.paymob.com/api/ecommerce/orders",
            {
                auth_token: authToken,
                delivery_needed: "false",
                amount_cents: amount * 100,
                currency: "EGP",
            }
        )
        return response.data;
    }

    async getPaymentKey(amount:number,authToken:string,orderId:string,
        billingData:any,integrationId:string){
        const response = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys",
            {
                auth_token: authToken,
                amount_cents: amount * 100,
                expiration: 3600,
                order_id: orderId,
                billing_data: billingData,
                currency: "EGP",
                integration_id: integrationId
            }
        );
        return response.data.token;
    }

    async initiateCardPayment(amount:number,billingData:any){
        const authToken = await this.getAuthToken();
        const order = await this.createOrder(amount,authToken);
        const paymentToken = await this.getPaymentKey(amount,authToken,order.id,billingData,this.CARD_IFRAME_ID);
        return paymentToken;
    }

    async initiatePaypalPayment(amount:number,billingData:any){
        const authToken = await this.getAuthToken();
        const order = await this.createOrder(amount,authToken);
        const paymentToken = await this.getPaymentKey(amount,authToken,order.id,billingData,this.PAYPAL_IFRAME_ID);
        return paymentToken;
    }

    async processDirectCardPayment(amount: number, cardDetails: any, billingData: any) {
        const authToken = await this.getAuthToken();
        const order = await this.createOrder(amount, authToken);
        const paymentToken = await this.getPaymentKey(amount, authToken, order.id, billingData, this.CARD_IFRAME_ID);
    
        const response = await axios.post('https://accept.paymob.com/api/acceptance/payments/pay', {
            source: {
                identifier: cardDetails.cardNumber,
                subtype: "CARD"
            },
            billing_data: billingData,
            payment_token: paymentToken
        });
    
        return response.data;
    }

    async processDirectPayPalPayment(amount: number, billingData: any) {
        const authToken = await this.getAuthToken();
        const order = await this.createOrder(amount, authToken);
        const paymentToken = await this.getPaymentKey(amount, authToken, order.id, billingData, this.PAYPAL_IFRAME_ID);
    
        const response = await axios.post('https://accept.paymob.com/api/acceptance/payments/pay', {
            source: {
                identifier: 'paypal',
                subtype: "PAYPAL"
            },
            billing_data: billingData,
            payment_token: paymentToken
        });
    
        return response.data;
    }
}
