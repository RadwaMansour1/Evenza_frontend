// src/app/models/event.model.ts
export interface Location {
  address: string;
  city: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
export interface Ticket {
  level: 'silver' | 'golden' | 'platinum';
  price: number;
  quantity: number;
}

export interface Event {
  id: string; // Representing the MongoDB `_id` field as a string
  title: string;
  description: string;
  date: string; // You can use `Date` but it would be best to handle it as string when parsing JSON
  time: string;
  location: Location;
  categories: string[];
  ticketsAvailable: Ticket[];
  isFree: boolean;
  imageUrl: string;
  organizerId: number;
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
];
