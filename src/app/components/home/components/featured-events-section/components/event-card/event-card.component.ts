import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin,featherClock, featherCalendar } from '@ng-icons/feather-icons';
import { Event } from '../../../../../../models/event.model';
import { TranslateModule } from '@ngx-translate/core';
import { TimeFormatPipe } from '../../../../../../pipes/time-format.pipe';
import { DateFormatPipe } from '../../../../../../pipes/date-format.pipe';

@Component({
  selector: 'app-event-card',
  imports: [NgIcon, RouterModule, TranslateModule, TimeFormatPipe,DateFormatPipe],
  templateUrl: './event-card.component.html',
  providers: [provideIcons({ featherClock, featherMapPin, featherCalendar })],
})
export class EventCardComponent {
  @Input() event!: Event;

  getLowestTicketPrice(event: Event): number {
    if (!event.ticketsAvailable || event.ticketsAvailable.length === 0)
      return 0;
    return Math.min(...event.ticketsAvailable.map((t) => t.price));
  }
}
