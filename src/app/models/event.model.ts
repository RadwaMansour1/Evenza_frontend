// src/app/models/event.model.ts

export interface Event {
  id: string;
  title: string;
  imageUrl: string;
  category: string; // e.g., 'Concert', 'Conference', 'Theater', 'Sports'
  date: string; // Ideally use Date object, but string for simplicity here (e.g., '2025-07-15')
  time: string; // e.g., '12:00 PM - 11:00 PM'
  city: string;
  location: string; // More specific venue
  price: number; // Price in USD or appropriate currency
  isFree: boolean;
  description?: string; // Optional
}

export interface FilterCriteria {
  searchTerm?: string | null;
  category?: string | null; // 'All' or specific category
  minPrice?: number | null;
  maxPrice?: number | null;
  isFree?: boolean | null;
  city?: string | null; // 'All' or specific city
  dateFrom?: string | null; // YYYY-MM-DD
  dateTo?: string | null; // YYYY-MM-DD
  sortBy?: 'date' | 'price' | 'title' | null;
  sortOrder?: 'asc' | 'desc' | null;
}

// Add sample categories and cities if needed for dropdowns
export const EVENT_CATEGORIES = [
  'All',
  'Concert',
  'Conference',
  'Theater',
  'Sports',
  'Workshop',
  'Exhibition',
];
export const EVENT_CITIES = [
  'All',
  'New York',
  'San Francisco',
  'London',
  'Paris',
  'Online',
]; // Add more as needed
