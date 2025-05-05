import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons, provideNgGlyphsConfig } from '@ng-icons/core';
import {
  featherMapPin,
  featherCalendar,
  featherClock,
} from '@ng-icons/feather-icons';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { heroTicket, heroShare } from '@ng-icons/heroicons/outline';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../models/event.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-details',
  imports: [
    CommonModule,
    NgIcon,
    RouterModule,
    DateFormatPipe,
    TimeFormatPipe,
    TranslateModule,
  ],
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
export class EventDetailsComponent implements OnInit {
  eventId: string = '';
  event!: Event;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    // Now you can use this.eventId to fetch the event details or display the event.
    console.log('Event ID:', this.eventId);
    // Fetch event details using the eventId if needed
    this.fetchEventDetails(this.eventId);
  }
  fetchEventDetails(eventId: string) {
    this.loading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.event = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
      },
    });
  }

  // New properties based on the second image
  // eventHighlights: string[] = [
  //   'Over 50 artists across 5 stages',
  //   'Food and drink from top NYC restaurants',
  //   'Art installations and interactive experiences',
  //   'Family-friendly activities area',
  // ];
  organizerName = 'NYC Music Productions';

  get mapUrl(): string {
    const loc = this.event.location;
    return loc.coordinates?.latitude && loc.coordinates?.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${loc.coordinates.latitude},${loc.coordinates.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${loc.address},${loc.city}`;
  }

  // bookTickets() {
  //   this.route.navigate(['/order']);

  // }

  getTicketNow() {
    throw new Error('Method not implemented.');
  }
  shareEvent() {
    const shareData = {
      title: this.event.title,
      text: `Check out this event: ${this.event.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Event shared successfully!'))
        .catch((err) => console.error('Share failed:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url).then(() => {
        this.toastr.success('Event link copied to clipboard!', 'Success');
      });
    }
  }
}
