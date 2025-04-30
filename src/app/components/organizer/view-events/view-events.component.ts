import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrganizerService } from '../../../services/event/organizer.service';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { Event } from '../../../models/event.model';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroMapPin,
  heroTicket,
  heroCalendar,
  heroClock,
  heroMagnifyingGlass,
  heroPlus,
  heroBanknotes,
  heroArrowUturnLeft,
} from '@ng-icons/heroicons/outline';
import { TimeFormatPipe } from '../../../pipes/time-format.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-events',
  imports: [
    CommonModule,
    FormsModule,
    DateFormatPipe,
    TimeFormatPipe,
    NgIcon,
    RouterLink,
  ],
  templateUrl: './view-events.component.html',
  providers: [
    provideIcons({
      heroMapPin,
      heroTicket,
      heroCalendar,
      heroClock,
      heroMagnifyingGlass,
      heroPlus,
      heroBanknotes,
      heroArrowUturnLeft,
    }),
    provideNgIconsConfig({ size: '1.2em' }),
  ],
})
export class ViewEventsComponent implements OnInit {
  data: {
    event: Event;
    totalRevenue: number;
    totalTicketsSold: number;
    totalTicketsRefunded: number;
  }[] = [];
  filteredEvents: {
    event: Event;
    totalRevenue: number;
    totalTicketsSold: number;
    totalTicketsRefunded: number;
  }[] = [];
  searchQuery: string = '';
  statusFilter: string = '';
  isLoading: boolean = false;

  constructor(
    private organizerService: OrganizerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.organizerService.getOrganizerEvents().subscribe({
      next: (response) => {
        console.log('Events', response.data);
        this.data = response.data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error creating event', err);
      },
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredEvents = this.data.filter((d) => {
      const matchesQuery =
        d.event.title.toLowerCase().includes(query) ||
        d.event.location.address.toLowerCase().includes(query);

      const matchesStatus =
        this.statusFilter === '' || // show all if no filter
        (this.statusFilter === 'Approved' && d.event.isApproved) ||
        (this.statusFilter === 'Pending' && !d.event.isApproved);

      return matchesQuery && matchesStatus;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  createNewEvent(): void {
    this.router.navigate(['/organizer/add-event']);
  }

  viewEvent(eventId: string): void {
    console.log('Viewing event:', eventId);
    // Implement routing or modal open
  }

  editEvent(eventId: string): void {
    console.log('Editing event:', eventId);
    // Navigate to edit form
  }

  deleteEvent(eventId: string): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this event?'
    );
    if (confirmDelete) {
      // this.events = this.events.filter((event) => event._id !== eventId);
      this.applyFilters();
      console.log('Deleted event:', eventId);
    }
  }
}
