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

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgIcon, RouterModule, CommonModule],
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
    private eventService: EventService
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
}

