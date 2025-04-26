import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin,featherClock, featherCalendar } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-event-card',
  imports: [NgIcon, RouterModule],
  templateUrl: './event-card.component.html',
  providers: [provideIcons({ featherClock,featherMapPin, featherCalendar })],
})
export class EventCardComponent {
  @Input() event!: {
    image: string;
    category: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
  };
}
