
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  eventCount?: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/admin/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<{ data: Category[] }>(this.apiUrl).pipe(
      map(response => response.data.map(category => ({
        ...category,
        slug: this.generateSlug(category.name),
        description: this.generateDescription(category.name),
        eventCount: category.eventCount || 0,
      })))
    );
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<{ data: Category }>(this.apiUrl, { name }).pipe(
      map(response => response.data)
    );
  }

  updateCategory(id: string, name: string): Observable<Category> {
    return this.http.patch<{ data: Category }>(
      `${this.apiUrl}/${id}`,
      { name }
    ).pipe(
      map(response => response.data)
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  private generateDescription(name: string): string {
    const descriptions: Record<string, string> = {
      'Sports': 'Sporting events and competitions',
      'Concerts': 'Music concerts and performances',
      'Conferences': 'Business and tech conferences',
      'Exhibitions': 'Art and cultural exhibitions',
      'Workshops': 'Educational workshops and classes',
      'Festivals': 'Cultural and seasonal festivals',
      'Live Concert': 'Live music performances and shows',
      'Theater': 'Theatrical performances and plays',
      'Comedy': 'Comedy shows and stand-up performances',
      'Food': 'Food and culinary events',
      'Travel': 'Travel and adventure events',
      'Networking': 'Networking events and meetups',
      'Charity': 'Charity events and fundraisers',
      'Family': 'Family-friendly events and activities',
      'Outdoor': 'Outdoor activities and adventures',
      'Indoor': 'Indoor activities and events',
      'Health': 'Health and wellness events',
      'Fitness': 'Fitness and exercise events',
      'Art': 'Art and creative events',
      'Technology': 'Technology and innovation events',
      'Business': 'Business and entrepreneurship events',
      'Education': 'Educational events and seminars',
      'Lifestyle': 'Lifestyle and personal development events',
      'Music': 'Music events and activities',
      'Dance': 'Dance events and performances',
      'Photography': 'Photography events and workshops',
      'workshop': 'Hands-on workshops and training sessions',
    };
    return descriptions[name] || `${name} events and activities`;
  }
}