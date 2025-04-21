import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons, provideNgGlyphsConfig } from '@ng-icons/core';
import { featherMapPin, featherCalendar, featherClock } from '@ng-icons/feather-icons';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { heroTicket, heroShare } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-event-details',
  imports: [CommonModule, NgIcon],
  templateUrl: './event-details.component.html',
  providers: [
    provideIcons({
      featherMapPin,
      featherCalendar,
      featherClock,
      heroHeartSolid,
      heroShare,
      heroTicket,
    }),
    provideNgGlyphsConfig({
      size: '1.5rem',
    }),
  ],
})
export class EventDetailsComponent {
  eventName = 'Summer Music Festival';
  eventDate = 'July 15-17, 2025';
  eventTime = '12:00 PM - 11:00 PM';
  eventLocation = 'Central Park, New York';
  eventImageUrl =
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  ticketPrice = 99;

  // Placeholder for event description
  eventDescription = `Join us for an unforgettable weekend of live music featuring top artists from around the world. Experience three days of amazing performances across multiple stages, delicious food vendors, art installations, and more in the heart of Central Park.`;
  // New properties based on the second image
  eventHighlights: string[] = [
    'Over 50 artists across 5 stages',
    'Food and drink from top NYC restaurants',
    'Art installations and interactive experiences',
    'Family-friendly activities area',
  ];

  organizerName = 'NYC Music Productions';

  tickets = [
    {
      name: 'General Admission',
      status: 'Available',
      price: 99,
      available: true,
    },
    { name: 'VIP Access', status: 'Available', price: 249, available: true },
    {
      name: 'Backstage Pass',
      status: 'Sold Out',
      price: 499,
      available: false,
    },
  ];
}
