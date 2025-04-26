import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroTicket,
  heroCalendar,
  heroInformationCircle,
} from '@ng-icons/heroicons/outline';
import { EventService } from '../../services/event/event.service';
import { CommonModule } from '@angular/common';
import { Event, Ticket } from '../../models/event.model';
import { OrderService } from '../../services/order/order.service';
// import { UserService } from '../../services/user/user.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgIcon, RouterModule, CommonModule, TranslateModule],
  templateUrl: './order.component.html',
  viewProviders: [provideIcons({ heroTicket, heroCalendar, heroInformationCircle })],
})

export class OrderComponent implements OnInit{
  event: Event | null = null;
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    // private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit() :void{
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('id');
      console.log('Received eventId:', eventId);

      if (eventId) {
        this.eventService.getEventById(eventId).subscribe((res) => {
          const data = res.data;
          console.log('Event Data:', data);
          console.log('Tickets Available:', data.ticketsAvailable);

          this.event = {
            _id: data._id,
            title: data.title,
            description: data.description,
            date: new Date(data.date).toLocaleDateString(),
            time: data.time,
            location: data.location,
            category: data.category,
            ticketsAvailable: data.ticketsAvailable,
            isFree: data.isFree,
            imageUrl: data.imageUrl,
            organizerId: data.organizerId,
          };

          this.tickets = data.ticketsAvailable.map((t: Ticket) => ({
            level: t.level,
            price: t.price,
            quantity: t.quantity,
          }));

          this.selectedTicket = this.tickets[0];
        }, (error) => {
          console.error('Error fetching event:', error);
        });
      }
    });
  }

  selectTicket(ticket: Ticket) {
    if (ticket.quantity > 0) {
      this.selectedTicket = ticket;
    }
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) this.quantity--;
  }

  get subtotal() {
    return this.selectedTicket ? this.selectedTicket.price * this.quantity : 0;
  }

  // Handle proceeding to the payment screen
  // continueToPayment() {
  //   const user = this.userService.getCurrentUser();

  //   if (!user || !user._id) {
  //     alert('User not logged in');
  //     return;
  //   }

  //   if (!this.event || !this.selectedTicket || this.quantity < 1) {
  //     alert('Please select ticket and quantity');
  //     return;
  //   }

  //   const itemTotalPrice = this.selectedTicket.price * this.quantity;

  //   const orderPayload = {
  //     userId: user._id,
  //     itemTotalPrice,
  //     countOfTickets: this.quantity,
  //     orderDetails: [
  //       {
  //         eventId: this.event._id,
  //         level: this.selectedTicket.level,
  //         numberOfTickets: this.quantity,
  //         totalPrice: itemTotalPrice,
  //       },
  //     ],
  //   };

  //   // Call createOrder method from OrderService to create the order
  //   this.orderService.createOrder(orderPayload).subscribe({
  //     next: (res) => {
  //       const orderId = res.data._id;
  //       this.router.navigate(['/payment', orderId]); // Navigate to the payment page
  //     },
  //     error: (err) => {
  //       console.error('Failed to create order:', err);
  //       alert('Error creating order. Please try again.');
  //     },
  //   });
  // }


}

