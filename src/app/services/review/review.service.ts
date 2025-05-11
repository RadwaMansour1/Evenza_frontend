import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateReview } from '../../models/review.model';
import { CONSTANTS } from '../../constants';

export interface CreateReviewDto {
  comment: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/user-reviews';

  constructor(private http: HttpClient) {}

  addReview(reviewData: CreateReview): Observable<any> {
    const token = localStorage.getItem(CONSTANTS.token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, reviewData, { headers });
  }

  getAllReviews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
