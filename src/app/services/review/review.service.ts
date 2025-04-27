import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateReview } from '../../models/review.model';

export interface CreateReviewDto {
  comment: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/user-reviews';

  constructor(private http: HttpClient) {}

  addReview(reviewData: CreateReview): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, reviewData, { headers });
  }

  getAllReviews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
