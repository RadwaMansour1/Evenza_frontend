import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { featherCalendar, featherCreditCard } from '@ng-icons/feather-icons';
import { heroTicket, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-how-it-work-section',
  imports: [CommonModule, NgIcon],
  templateUrl: './how-it-work-section.component.html',
  providers: [
    provideIcons({
      heroMagnifyingGlass,
      featherCalendar,
      featherCreditCard,
      heroTicket,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class HowItWorkSectionComponent {
  steps = [
    {
      icon: 'heroMagnifyingGlass',
      title: 'Find Events',
      description:
        'Browse and search through thousands of events happening near you or worldwide.',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-500',
    },
    {
      icon: 'featherCalendar',
      title: 'Choose Date & Seats',
      description:
        'Select your preferred date and choose the best seats available for your event.',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
    {
      icon: 'featherCreditCard',
      title: 'Secure Payment',
      description:
        'Pay securely using multiple payment options, with instant confirmation.',
      bgColor: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      icon: 'heroTicket',
      title: 'Get Tickets',
      description:
        'Receive your e-tickets instantly via email or download them from your account.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
  ];
}
