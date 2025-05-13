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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../models/event.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../../constants';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-event-details',
  imports: [
    CommonModule,
    NgIcon,
    RouterModule,
    DateFormatPipe,
    TimeFormatPipe,
    TranslateModule,
    NgxSpinnerModule,
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
  hasFreeTicketAlready = false;
  freeTicketsQuantity = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    // console.log('Event ID:', this.eventId);
    this.fetchEventDetails(this.eventId);
  }
  fetchEventDetails(eventId: string) {
    this.loading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.event = res.data;
        this.freeTicketsQuantity = res.data.freeTicketsQuantity;
        this.loading = false;

        const token =
          localStorage.getItem(CONSTANTS.token) ||
          sessionStorage.getItem(CONSTANTS.token);

        if (token && this.event.isFree) {
          this.checkIfUserHasFreeTicket();
        }
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
      },
    });
  }

  checkIfUserHasFreeTicket() {
    this.eventService.hasFreeTicket(this.eventId).subscribe({
      next: (res) => {
        // console.log(res);
        this.hasFreeTicketAlready = res.data;
      },
      error: (err) => {
        console.error('Error checking free ticket:', err);
      },
    });
  }

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
    const token =
      localStorage.getItem(CONSTANTS.token) ||
      sessionStorage.getItem(CONSTANTS.token);
    if (!token) {
      this.toastr.error('You need to login first', 'Error');
      this.router.navigate(['/login']);
    }
    this.spinner.show();
    const ticketData = {
      eventId: this.eventId,
      eventName: this.event.title,
      date: this.event.date,
      time: this.event.time,
      location: this.event.location.address,
      purchaseDate: new Date(),
    };

    this.eventService.getFreeTicket(ticketData).subscribe({
      next: (res) => {
        console.log(res.data);
        this.toastr.success(
          'Ticket Booked Successfully check your email',
          'Success'
        );
        this.hasFreeTicketAlready = true;
        this.spinner.hide();
        const ticketId=res.data._id;
        const successUrl = `/success?ticketId=${ticketId}`;
        window.location.href = successUrl;
      },
      error: (err) => {
        console.error('Error booking ticket:', err);
        this.toastr.error('Sorry, something went wrong!, please try again later', 'Error');
        this.spinner.hide();
      },
    });
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
