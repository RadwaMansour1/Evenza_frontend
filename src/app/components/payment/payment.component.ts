import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymobService } from '../../services/payment/paymob.service';
import { PaypalService } from '../../services/payment/paypal.service';
import Swal from 'sweetalert2';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCreditCard, heroShieldCheck, heroCalendar, heroInformationCircle } from '@ng-icons/heroicons/outline';
import { StripeService } from '../../services/stripe.service';
import { ActivatedRoute } from '@angular/router'; // <-- Add this import
import { OrderService } from '../../services/order/order.service';
import { EventService } from '../../services/event/event.service';
import { WalletService } from '../../services/wallet/wallet.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule
import { PaymentService } from '../../services/payment/payment.service';
import { TicketsService } from '../../services/tickets/tickets.service';
import { TicketModel } from '../../models/ticket.model';

@Component({
  selector: 'app-payment',
  standalone: true, // Assuming it's standalone
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    TranslateModule // Add TranslateModule here
    // ... other imports for the component
  ],
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
export class PaymentComponent implements OnInit {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly stripeService: StripeService,
    private readonly route: ActivatedRoute ,
    private readonly orderService: OrderService,
    private readonly eventService: EventService,
    private readonly walletService:WalletService,
    private readonly paymentService:PaymentService,
    private readonly ticketService:TicketsService,

  ) { }

  selectedMethod: string = 'stripe';

  date: string = new Date().toDateString();

  quantity: number|null = null;
  ticketPrice:  number|null = null;
  serviceFee:  number = 0;
  tax:  number = 0;
  total:  number|null =null;
  amount:number|null = null;
  userId: string = "";
  eventId: string ="";
  ticketType: string = "";

  myWallet:number = 0

  orderSummary:any = {
    imgUrl : "",
    eventName:"",
    eventDate:"",
    numberOfTickets:0,
    ticketType:"",
    price:0,
  }
  
  orderId: string | null = null;
  order: any = null; // Add a property to hold the order details
  
eventDetails: {
  title: string;
  date: Date;
  time: string;
  location: {
    address: string;
    city: string;
  };
  imageUrl: string;
} | null = null;

ticketId:string|null = null;

  payWithStripe() {
    console.log('Stripe button clicked');
    this.stripeService.checkout(this.amount!,this.userId, this.orderId!,this.eventId,this.ticketType,this.quantity!);
    // const successUrl = `/success?orderId=${this.orderId}&ticketId=${this.userId}&payment_method=wallet`;
    // window.location.href = successUrl;
  } 


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      console.log('Order ID:', this.orderId);

      if (this.orderId) {
        // Use next/error for HTTP observable
        this.orderService.getOrderById(this.orderId).subscribe({
          next: (order: any) => {
            this.order = order;
            console.log('Fetched order:', this.order); // <-- Now this.order is set
            // Fix: Access nested data
            const orderData = order.data.data;
            this.userId = orderData.userId;
            this.quantity = orderData.countOfTickets;
            this.orderSummary.numberOfTickets = this.quantity;
            this.ticketPrice = orderData.totalPrice;
            this.serviceFee = orderData.totalPrice * 0.05;
            this.tax = orderData.totalPrice * 0.14;
            this.total =this.ticketPrice!+ this.serviceFee + this.tax;
            this.amount =this.total / this.quantity!;
            console.log('orderDetails:', orderData.orderDetails);
            this.eventId = orderData.orderDetails[0]?.eventId;
            console.log('eventId to fetch:', this.eventId);
            this.ticketType = orderData.orderDetails[0]?.level;

            if (this.eventId) {
              this.eventService.getEventById(this.eventId).subscribe({
                next: (eventRes: any) => {
                  console.log('Raw eventRes:', eventRes);
                  const eventData = eventRes.data;
                  this.eventDetails = eventRes.data;
                  console.log('Fetched event:', eventData);
                  this.orderSummary.imgUrl = eventData.imageUrl;
                  this.orderSummary.eventName = eventData.title;
                  const eventDateObj = new Date(eventData.date);
                  this.orderSummary.eventDate = eventDateObj.toLocaleDateString('en-GB'); // e.g., 10/04/2025
                  this.date = eventDateObj.toLocaleString();
                },
                error: (err) => {
                  console.error('Error fetching event:', err);
                }
              });
            } else {
              console.error('eventId is missing, cannot fetch event.');
            }
            if(this.userId){
              this.walletService.getTicketByUserId(this.userId).subscribe({
                next:(res)=>{
                  this.myWallet = res.data.balance
                },
                error:(err)=>{
              console.error('userId is missing, cannot fetch wallet data.');

                }
              })
              
            }

          },
          error: (err) => {
            console.error('Error fetching order:', err);
          }
        });
      }
    });

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
        const paymentButtons = await this.paypalService.createPayment(this.total!);

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

  // async confirmPayment(event?: Event): Promise<void> {
  //   event?.preventDefault();
  
  //   if (this.selectedMethod === 'evenza') {
  //     console.log('Initiating payment with Evenza Wallet...');
  
  //     if (this.myWallet < this.total!) {
  //       Swal.fire({
  //         title: "Insufficient Funds",
  //         text: `Your wallet balance is ${this.myWallet}. You need ${this.total} to complete the payment.`,
  //         icon: "warning"
  //       });
  //       return;
  //     }else{
  //       try {
  //         const walletResponse = await this.walletService.bookFromWallet(this.userId, this.total!).toPromise();
  //         console.log("Wallet transaction response:", walletResponse);
    
  //         const paymentData = {
  //           userId: this.userId,
  //           eventId: this.eventId,
  //           orderId: this.orderId!,
  //           ticketType: this.ticketType,
  //           quantity: this.quantity!,
  //           amountPaid: this.total!,
  //           currency: "EGP",
  //           transactionId: walletResponse.data.transactionId,
  //           paymentMethod: "Wallet",
  //         };
    
  //         await this.paymentService.createPayment(paymentData).toPromise();
  //         console.log("Payment saved successfully");
  //         const location = `${this.eventDetails!.location.address}, ${this.eventDetails!.location.city}`;
  //         this.ticketService.createTicket({
  //           transactionId: walletResponse.data.transactionId,
  //           userId: this.userId,
  //           eventId: this.eventId,
  //           eventName: this.eventDetails!.title,
  //           ticketType: this.ticketType,
  //           date: this.eventDetails!.date,
  //           time:this.eventDetails!.time,
  //           location:location,
  //           purchaseDate: new Date(),
  //           price: this.ticketPrice!,
  //           quantity: this.quantity!,
  //         }).subscribe({
  //           next: (res) => {
  //             console.log('Ticket created successfully:', res);
  //             this.ticketId = res.data._id;
  //           },
  //           error: (err) => {
  //             console.error('Error creating ticket:', err);
  //           }
  //         })
    
  //         // الانتقال إلى صفحة النجاح مع البيانات المناسبة
  //         const successUrl = `/success?tiketId=${this.ticketId}&payment_method=wallet`;
  //         window.location.href = successUrl;
  //       } catch (error) {
  //         console.error("Error during payment process:", error);
  //         Swal.fire({
  //           title: "Payment Error",
  //           text: "An error occurred during the payment process. Please try again later.",
  //           icon: "error"
  //         });
  //       }
  //     }
  
  //   } else {
  //     console.warn("Selected payment method is not Evenza Wallet.");
  //   }
  // }
  async confirmPayment(event?: Event): Promise<void> {
    event?.preventDefault();
  
    if (this.selectedMethod === 'evenza') {
      console.log('Initiating payment with Evenza Wallet...');
  
      if (this.myWallet < this.total!) {
        Swal.fire({
          title: "Insufficient Funds",
          text: `Your wallet balance is ${this.myWallet}. You need ${this.total} to complete the payment.`,
          icon: "warning"
        });
        return;
      }
  
      try {
        const walletResponse = await this.walletService.bookFromWallet(this.userId, this.total!).toPromise();
        console.log("Wallet transaction response:", walletResponse);
  
        const paymentData = {
          userId: this.userId,
          eventId: this.eventId,
          orderId: this.orderId!,
          ticketType: this.ticketType,
          quantity: this.quantity!,
          amountPaid: this.total!,
          currency: "EGP",
          transactionId: walletResponse.data.transactionId,
          paymentMethod: "Wallet",
        };
  
        await this.paymentService.createPayment(paymentData).toPromise();
        console.log("Payment saved successfully");

        const location = `${this.eventDetails!.location.address}, ${this.eventDetails!.location.city}`;
        
        const ticketResponse = await this.ticketService.createTicket({
          transactionId: walletResponse.data.transactionId,
          userId: this.userId,
          eventId: this.eventId,
          eventName: this.eventDetails!.title,
          ticketType: this.ticketType,
          date: this.eventDetails!.date,
          time: this.eventDetails!.time,
          location: location,
          purchaseDate: new Date(),
          price: this.ticketPrice!,
          quantity: this.quantity!,
        }).toPromise();

        console.log('Ticket created successfully:', ticketResponse);
        this.ticketId = ticketResponse.data._id; 

        // انتقال إلى صفحة النجاح مع تمرير ticketId الصحيح
        const successUrl = `/success?orderId=${this.orderId}&ticketId=${this.ticketId}&payment_method=wallet`;
        window.location.href = successUrl;

      } catch (error) {
        console.error("Error during payment process:", error);
        Swal.fire({
          title: "Payment Error",
          text: "An error occurred during the payment process. Please try again later.",
          icon: "error"
        });
      }
  
    } else {
      console.warn("Selected payment method is not Evenza Wallet.");
    }
}
}
