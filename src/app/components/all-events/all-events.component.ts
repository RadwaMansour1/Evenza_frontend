import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
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
// --- Mock Data Service ---
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    imageUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Concert',
    date: '2025-07-15',
    time: '12:00 PM - 11:00 PM',
    city: 'New York',
    location: 'Central Park',
    price: 99,
    isFree: false,
  },
  {
    id: '2',
    title: 'Tech Conference 2025',
    imageUrl:
      'https://images.unsplash.com/photo-1560523159-94c9d18bcf27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Conference',
    date: '2025-08-21',
    time: '9:00 AM - 5:00 PM',
    city: 'San Francisco',
    location: 'Moscone Center',
    price: 299,
    isFree: false,
  },
  {
    id: '3',
    title: 'NYC Broadway Show',
    imageUrl:
      'https://media.istockphoto.com/id/182176177/photo/usher-opening-red-theater-curtain-with-spotlights.webp?s=2048x2048&w=is&k=20&c=LR0YJIBBIUh0eGOPyOsoyH6lDGxQGMe_kEga5emQ1rs=',
    category: 'Theater',
    date: '2025-09-10',
    time: '7:00 PM - 10:00 PM',
    city: 'New York',
    location: 'Broadway',
    price: 59,
    isFree: false,
  },
  {
    id: '4',
    title: 'Mountain Hiking Weekend',
    imageUrl:
      'https://media.istockphoto.com/id/1996377443/photo/diverse-friends-enjoying-sunny-mountain-hike.webp?s=2048x2048&w=is&k=20&c=mNV-ItO6PSaKLBFER9o-easDd9YQessxUCzfMrBxFF8=',
    category: 'Sports',
    date: '2025-06-25',
    time: 'All Day',
    city: 'Denver',
    location: 'Rocky Mountains',
    price: 0,
    isFree: true,
  },
  {
    id: '5',
    title: 'Art Exhibition Opening',
    imageUrl:
      'https://media.istockphoto.com/id/1131101048/photo/art-exibition-lot-3d-visualization.jpg?s=2048x2048&w=is&k=20&c=uAwPQSmGuIufX7_0cpSLP9eKPOcb1mWmZjb9Rwb4ChI=',
    category: 'Exhibition',
    date: '2025-05-30',
    time: '6:00 PM - 9:00 PM',
    city: 'Paris',
    location: 'Louvre Museum',
    price: 25,
    isFree: false,
  },
  {
    id: '6',
    title: 'Online Coding Workshop',
    imageUrl:
      'https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Workshop',
    date: '2025-10-05',
    time: '1:00 PM - 4:00 PM',
    city: 'Online',
    location: 'Zoom',
    price: 0,
    isFree: true,
  },
];
// --- End Mock Data ---

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
  allEvents: Event[] = MOCK_EVENTS; // Replace with fetched data
  filteredEvents$!: Observable<Event[]>;
  // Make constants available in template
  categories = EVENT_CATEGORIES;
  cities = EVENT_CITIES;


  ngOnInit(): void {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      category: ['All'],
      minPrice: [null],
      maxPrice: [null], // Corresponds to slider in image
      isFree: [false],
      city: ['All'],
      dateFrom: [null],
      dateTo: [null],
      sortBy: ['date'],
      sortOrder: ['asc'],
    });

    // Listen to form changes and apply filters/sorting
    this.filteredEvents$ = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value), // Trigger initial filtering
      debounceTime(300), // Wait after user stops typing/changing
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      ), // Only proceed if values actually changed
      map((criteria) => this.filterAndSortEvents(criteria))
    );
  }

  filterAndSortEvents(criteria: FilterCriteria): Event[] {
    let events = [...this.allEvents]; // Start with a copy

    // --- Filtering ---
    // Search Term (Title or Location)
    if (criteria.searchTerm) {
      const term = criteria.searchTerm.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.location.toLowerCase().includes(term) ||
          e.city.toLowerCase().includes(term)
      );
    }
    // Category
    if (criteria.category && criteria.category !== 'All') {
      events = events.filter((e) => e.category === criteria.category);
    }
    // City
    if (criteria.city && criteria.city !== 'All') {
      events = events.filter((e) => e.city === criteria.city);
    }
    // Is Free
    if (criteria.isFree) {
      events = events.filter((e) => e.isFree);
    }
    // Price Range (handle nulls)
    const minPrice = criteria.minPrice ?? -Infinity;
    const maxPrice = criteria.maxPrice ?? Infinity;
    if (criteria.minPrice != null || criteria.maxPrice != null) {
      // If filtering by price, exclude free items unless explicitly included by range
      // Or handle based on isFree toggle interaction
      events = events.filter(
        (e) => !e.isFree && e.price >= minPrice && e.price <= maxPrice
      );
      // If you want isFree toggle to override price range:
      // events = events.filter(e => (criteria.isFree && e.isFree) || (!e.isFree && e.price >= minPrice && e.price <= maxPrice) );
    }

    // Date Range (Simple string comparison, use date objects for proper comparison)
    if (criteria.dateFrom) {
      events = events.filter((e) => e.date >= criteria.dateFrom!);
    }
    if (criteria.dateTo) {
      events = events.filter((e) => e.date <= criteria.dateTo!);
    }

    // --- Sorting ---
    const sortField = criteria.sortBy || 'date';
    const sortOrderFactor = (criteria.sortOrder || 'asc') === 'asc' ? 1 : -1;

    events.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (sortField) {
        case 'price':
          // Handle free items during price sort if needed (e.g., sort them first/last)
          valA = a.isFree ? 0 : a.price;
          valB = b.isFree ? 0 : b.price;
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
