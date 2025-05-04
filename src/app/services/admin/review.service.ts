import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Review {
  _id: string;
  userId: {
    firstName: any , lastName:any, _id: string 
};  // You can extend this later if user data is expanded
  comment: string;
  rating: number;
  isVisible: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:3000/admin/reviews'; // adjust your API base if needed

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<Review[]> {
    return this.http.get<{ data: Review[] }>(this.baseUrl).pipe(
      map(response => response.data)
    );
  }
  approveReview(reviewId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve/${reviewId}`, {});
  }
  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reviewId}`);
  }
}
