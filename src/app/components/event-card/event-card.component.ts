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
import { RouterModule } from '@angular/router';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule, NgIconComponent,RouterModule,TimeFormatPipe,DateFormatPipe,TranslateModule],
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

  getLowestTicketPrice(event: Event): number {
    if (!event.ticketsAvailable || event.ticketsAvailable.length === 0)
      return 0;
    return Math.min(...event.ticketsAvailable.map((t) => t.price));
  }
}
