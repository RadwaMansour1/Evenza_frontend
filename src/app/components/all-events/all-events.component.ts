import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherFilter } from '@ng-icons/feather-icons';
import {
  Event,
  FilterCriteria,
  EVENT_CATEGORIES,
  EVENT_CITIES,
} from '../../models/event.model';
import { EventService } from '../../services/event/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventFiltersComponent } from './components/event-filters/event-filters.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-events',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventCardComponent,
    NgIconComponent,
    EventFiltersComponent,
    TranslateModule,
  ],
  templateUrl: './all-events.component.html',
  viewProviders: [provideIcons({ featherFilter })],
})
export class AllEventsComponent implements OnInit {
  allEvents: Event[] = [];
  categories = EVENT_CATEGORIES;
  cities = EVENT_CITIES;
  loading = false;

  currentPage = 1;
  itemsPerPage = 6;
  totalEvents = 0;
  totalPages = 0;

  // State for current filters
  currentFilters: FilterCriteria = {
    search: '',
    category: 'All',
    minPrice: null,
    maxPrice: null,
    isFree: null, // Use null or undefined initially if the backend handles the absence
    city: 'All',
    dateFrom: null,
    dateTo: null,
    sortBy: 'date',
    sortOrder: 'asc',
  };

  constructor(private eventService: EventService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'];
      console.log('Search term from URL:', searchTerm);
      this.currentFilters.search = searchTerm;
      // Initial fetch when the component loads
      this.fetchEvents();
    });
    // Initial fetch when the component loads
    // this.fetchEvents();
  }

  // Method to fetch events based on current state
  fetchEvents(): void {
    this.loading = true;
    // Pass current pagination and filter state to the service
    this.eventService
      .getEvents(this.currentPage, this.itemsPerPage, this.currentFilters)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.allEvents = res.data.events || []; // Update events
          this.totalEvents = res.data.total || 0; // Update total count
          this.totalPages = res.data.totalPages || 0; // Update total pages
          this.currentPage = res.data.page || 1; // Confirm current page from backend
          this.loading = false;
          console.log('Events fetched:', this.allEvents); // Log the fetched events
          console.log('Pagination state:', {
            page: this.currentPage,
            total: this.totalEvents,
            totalPages: this.totalPages,
          });
        },
        error: (err: any) => {
          console.error('Error fetching events:', err);
          this.loading = false;
          this.allEvents = [];
          this.totalEvents = 0;
          this.totalPages = 0;
        },
      });
  }

  // Handler for filters changing (from EventFiltersComponent output)
  onFiltersChanged(criteria: FilterCriteria): void {
    console.log('Filters changed:', criteria);
    this.currentFilters = { ...criteria }; // Update the current filters state
    this.currentPage = 1; // Reset to the first page when filters change
    this.fetchEvents(); // Fetch events with the new filters
  }

  onResetFilters(): void {
    console.log('Resetting filters');
    this.currentFilters = {
      search: '',
      category: 'All',
      minPrice: null,
      maxPrice: null,
      isFree: null,
      city: 'All',
      dateFrom: null,
      dateTo: null,
      sortBy: 'date',
      sortOrder: 'asc',
    };
    this.currentPage = 1;
    this.fetchEvents();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      console.log('Changing page to:', page);
      this.currentPage = page;
      this.fetchEvents();
    }
  }
  showPagination(): boolean {
    return this.totalEvents > this.itemsPerPage && !this.loading;
  }
}
