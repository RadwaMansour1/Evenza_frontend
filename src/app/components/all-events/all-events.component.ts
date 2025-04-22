import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  startWith,
  map,
  Observable,
} from 'rxjs';

import { EventCardComponent } from '../event-card/event-card.component';
import {
  Event,
  FilterCriteria,
  EVENT_CATEGORIES,
  EVENT_CITIES,
} from '../../models/event.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherFilter } from '@ng-icons/feather-icons';
import { EventFiltersComponent } from './components/event-filters/event-filters.component';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-all-events',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventCardComponent,
    NgIconComponent,
    EventFiltersComponent,
  ],
  templateUrl: './all-events.component.html',
  viewProviders: [provideIcons({ featherFilter })],
})
export class AllEventsComponent implements OnInit {
  private fb = inject(FormBuilder);
  filterForm!: FormGroup<any>;
  allEvents: Event[] = [];
  filteredEvents$!: Observable<Event[]>;
  categories = EVENT_CATEGORIES;
  cities = EVENT_CITIES;

  // all-events.component.ts
  loading = false;
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(page: number = 1) {
    this.loading = true;
    this.eventService.getEvents(page).subscribe({
      next: (res: any) => {
        this.allEvents = res.data.events;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  // loading!: Observable<boolean>;

  // constructor(private store: Store<AppState>) {}

  // ngOnInit(): void {
  //   this.loading = this.store.select(selectEventLoading);
  //   // Initialize the filter form with default values
  //   this.filterForm = this.fb.group({
  //     searchTerm: [''],
  //     category: ['All'],
  //     minPrice: [null],
  //     maxPrice: [null],
  //     isFree: [false],
  //     city: ['All'],
  //     dateFrom: [null],
  //     dateTo: [null],
  //     sortBy: ['date'],
  //     sortOrder: ['asc'],
  //   });

  //   this.store.dispatch(getAllEvents());
  //   this.store.select(selectAllEvents).subscribe({
  //     next: (events) => {
  //       this.allEvents = events || [];
  //       console.log('all Events', this.allEvents);
  //       this.filteredEvents$ = this.filterForm.valueChanges.pipe(
  //         startWith(this.filterForm.value),
  //         debounceTime(300),
  //         distinctUntilChanged(
  //           (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
  //         ),
  //         map((criteria) => this.filterAndSortEvents(criteria))
  //       );
  //     },
  //   });
  // }

  filterAndSortEvents(criteria: FilterCriteria): Event[] {
    if (!this.allEvents || this.allEvents.length === 0) {
      return [];
    }
    let events = [...this.allEvents];
    // --- Filtering ---
    // Search Term (Title or Location)
    if (criteria.searchTerm) {
      const term = criteria.searchTerm.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.location.address.toLowerCase().includes(term) ||
          e.location.city.toLowerCase().includes(term)
      );
    }
    // Category filter (check if any event category matches the selected one)
    if (criteria.category && criteria.category !== 'All') {
      events = events.filter((e) => e.categories.includes(criteria.category!));
    }

    // City filter
    if (criteria.city && criteria.city !== 'All') {
      events = events.filter((e) => e.location.city === criteria.city);
    }

    // Is Free filter
    if (criteria.isFree) {
      events = events.filter((e) => e.isFree);
    }

    // Price Range (handle nulls)
    const minPrice = criteria.minPrice ?? -Infinity;
    const maxPrice = criteria.maxPrice ?? Infinity;
    if (criteria.minPrice != null || criteria.maxPrice != null) {
      events = events.filter((e) => {
        if (e.isFree) return false;

        return e.ticketsAvailable.some(
          (ticket) => ticket.price >= minPrice && ticket.price <= maxPrice
        );
      });
    }

    // Date Range (Simple string comparison, use date objects for proper comparison)
    if (criteria.dateFrom) {
      events = events.filter(
        (e) => new Date(e.date) >= new Date(criteria.dateFrom!)
      );
    }
    if (criteria.dateTo) {
      events = events.filter(
        (e) => new Date(e.date) <= new Date(criteria.dateTo!)
      );
    }

    // --- Sorting ---
    const sortField = criteria.sortBy || 'date';
    const sortOrderFactor = (criteria.sortOrder || 'asc') === 'asc' ? 1 : -1;

    events.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (sortField) {
        case 'price':
          // Sort by minimum ticket price (0 if free)
          const getMinPrice = (event: Event) => {
            if (event.isFree) return 0;
            return Math.min(...event.ticketsAvailable.map((t) => t.price));
          };

          valA = getMinPrice(a);
          valB = getMinPrice(b);
          break;

        case 'title':
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;
        case 'date':
        default:
          // Use Date objects for accurate sorting
          valA = new Date(a.date).getTime();
          valB = new Date(b.date).getTime();
          break;
      }

      if (valA < valB) return -1 * sortOrderFactor;
      if (valA > valB) return 1 * sortOrderFactor;
      return 0;
    });

    return events;
  }

  // Optional: Reset button
  resetFilters(): void {
    this.filterForm.reset({
      searchTerm: '',
      category: 'All',
      minPrice: null,
      maxPrice: null,
      isFree: false,
      city: 'All',
      dateFrom: null,
      dateTo: null,
      sortBy: 'date',
      sortOrder: 'asc',
    });
  }

  onFiltersChanged(criteria: any): void {
    this.filteredEvents$ = this.filterForm.valueChanges.pipe(
      startWith(criteria),
      map(() => this.filterAndSortEvents(criteria))
    );
  }

  onResetFilters(): void {
    this.resetFilters();
  }
}
