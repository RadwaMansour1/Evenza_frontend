// src/app/components/event-card/event-card.component.ts
import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherCalendar,
  featherClock,
  featherMapPin,
  featherHeart,
} from '@ng-icons/feather-icons';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './event-card.component.html',
  viewProviders: [
    provideIcons({
      featherCalendar,
      featherClock,
      featherMapPin,
      featherHeart,
    }),
  ],
})
export class EventCardComponent {
  @Input({ required: true }) event!: Event;

  // Basic date formatting (consider using a pipe for more robust formatting)
  get formattedDate(): string {
    if (!this.event.date) return '';
    try {
      return new Date(this.event.date).toLocaleDateString('en-US', {
        month: 'long', // e.g., July
        day: 'numeric', // e.g., 15
        year: 'numeric', // e.g., 2025
      });
    } catch (e) {
      return this.event.date; // Fallback
    }
  }
}
