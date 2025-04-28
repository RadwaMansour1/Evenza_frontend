import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTicket, heroCalendar, heroInformationCircle } from '@ng-icons/heroicons/outline';
import { EventService } from '../../services/event/event.service';
import { CommonModule } from '@angular/common';
import { Event, Ticket } from '../../models/event.model';
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/profile/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { Profile } from '../../models/profile.model';
import { CreateOrderPayload } from '../../models/order.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgIcon, RouterModule, CommonModule, TranslateModule],
  templateUrl: './order.component.html',
  viewProviders: [provideIcons({ heroTicket, heroCalendar, heroInformationCircle })],
})
export class OrderComponent implements OnInit {
  event: Event | null = null;
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;
  quantity = 1;
  userProfile: Profile | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        this.eventService.getEventById(eventId).subscribe({
          next: (res) => {
            const data = res.data;
            console.log('Event Data:', data);

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
          },
          error: (err) => {
            console.error('Error fetching event:', err);
          }
        });
      }
    });

    this.userService.getProfile().subscribe({
      next: (profile) => {
        console.log('User Profile:', profile);
        this.userProfile = profile;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
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
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  get subtotal() {
    return (this.selectedTicket?.price || 0) * this.quantity;
  }


  createOrder() {
    if (!this.userProfile || !this.event || !this.selectedTicket) return;

    const orderPayload: CreateOrderPayload = {
      userId: this.userProfile._id,
      itemTotalPrice: this.subtotal,
      countOfTickets: this.quantity,
      orderDetails: [
        {
          eventId: this.event._id,
          level: this.selectedTicket.level as 'Silver' | 'Golden' | 'Platinum',
          numberOfTickets: this.quantity,
          totalPrice: this.subtotal,
        }
      ]
    };

    this.orderService.createOrder(orderPayload).subscribe({
      next: (res: any) => { // <-- Accept any type for res
        console.log('Order created:', res);
        // Access orderId from res.data._id
        this.router.navigate(['/payment'], { queryParams: { orderId: res.data._id } });
      },
      error: (err) => {
        console.error('Error creating order', err);
      }
    });
  }
}

