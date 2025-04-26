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
  level: 'Silver' | 'Golden' | 'Platinum';
  price: number;
  quantity: number;
}

export interface Event {
  _id: string; // Representing the MongoDB `_id` field as a string
  title: string;
  description: string;
  date: string; // You can use `Date` but it would be best to handle it as string when parsing JSON
  time: string;
  location: Location;
  category: string;
  ticketsAvailable: Ticket[];
  isFree: boolean;
  imageUrl: string;
  organizerId: number;
}

export interface FilterCriteria {
  search?: string | null;
  category?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  isFree?: boolean | null;
  city?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  sortBy?: 'date' | 'price' | 'title' | null;
  sortOrder?: 'asc' | 'desc' | null;
}

export const EVENT_CATEGORIES = [
  'All',
  'Music',
  'Art',
  'Business',
  'Tech',
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
