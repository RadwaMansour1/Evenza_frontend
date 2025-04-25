import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { heroTicket } from '@ng-icons/heroicons/outline';
import {
  featherCalendar,
  featherClock,
  featherMapPin,
} from '@ng-icons/feather-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-tickets',
  imports: [CommonModule, NgIcon],
  templateUrl: './my-tickets.component.html',
  providers: [
    provideIcons({ heroTicket, featherCalendar, featherClock, featherMapPin }),
    provideNgIconsConfig({ size: '1.05rem' }),
  ],
})
export class MyTicketsComponent {
  tickets = [
    {
      id: 'T12345',
      type: 'General Admission',
      eventName: 'Summer Music Festival',
      date: 'July 15–17, 2025',
      time: '12:00 PM - 11:00 PM',
      location: 'Central Park, New York',
      purchaseDate: 'April 10, 2025',
      price: 99.0,
    },
    {
      id: 'T12346',
      type: 'VIP Access',
      eventName: 'Tech Conference 2025',
      date: 'June 20, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, San Francisco',
      purchaseDate: 'March 15, 2025',
      price: 299.0,
    },
  ];

  constructor(private router: Router) {}
  navigateEvents() {
    this.router.navigate(['/events']);
  }
  requestRefund(arg0: string) {
    throw new Error('Method not implemented.');
  }
  navigateEventDetails(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
