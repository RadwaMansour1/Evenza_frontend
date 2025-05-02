import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-event-filters',
  imports: [CommonModule, ReactiveFormsModule,TranslateModule],
  templateUrl: './event-filters.component.html',
})
export class EventFiltersComponent implements OnInit, OnDestroy {
  @Input() categories: string[] = [];
  @Input() cities: string[] = [];
  @Input() initialSearchTerm?: string | null = '';

  @Output() filtersChanged = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<void>();

  filterForm!: FormGroup;
  isFilterOpen = false;
  screenIsLarge = false;
  // Define sort options directly in the component
  sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'price', label: 'Price' },
    { value: 'title', label: 'Title' },
  ];
  sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.detectScreenSize();
    window.addEventListener('resize', this.detectScreenSize.bind(this));
    this.filterForm = this.fb.group({
      search: [this.initialSearchTerm ?? ''],
      category: ['All'],
      minPrice: [null],
      maxPrice: [null],
      isFree: [null],
      city: ['All'],
      dateFrom: [null],
      dateTo: [null],
      sortBy: ['date'],
      sortOrder: ['asc'],
    });

    // Emit filter changes whenever the form values change
    this.filterForm.valueChanges.subscribe((values) => {
      this.filtersChanged.emit(values);
    });
  }

  toggleFilterVisibility() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  detectScreenSize() {
    this.screenIsLarge = window.innerWidth >= 768;
    if (this.screenIsLarge) {
      this.isFilterOpen = true;
    }
  }
  onResetFilters(): void {
    this.filterForm.reset({
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
    });
    this.resetFilters.emit();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.detectScreenSize.bind(this));
  }
}
