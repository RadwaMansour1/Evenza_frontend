import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftRight, heroPaperAirplane} from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewService } from '../../services/review/review.service';
import { CreateReview } from '../../models/review.model';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../constants';


@Component({
  selector: 'app-add-review',
  imports: [NgIcon, CommonModule, FormsModule, TranslateModule, CustomAlertComponent],
  templateUrl: './add-review.component.html',
  providers: [
    provideIcons({ heroChatBubbleLeftRight, heroPaperAirplane})
  ]
})
export class AddReviewComponent implements OnInit {
  rating = 0;
  hoverRating = 0;
  message = '';
  isLoggedIn = false;
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem(CONSTANTS.token);
    this.isLoggedIn = !!token;
  }

  setRating(value: number) {
    this.rating = value;
  }

  setHover(value: number) {
    this.hoverRating = value;
  }

  clearHover() {
    this.hoverRating = 0;
  }

  submitFeedback() {
    const token = localStorage.getItem(CONSTANTS.token);

    if (!token) {
      this.isLoggedIn = false;
      this.showCustomAlert('You must be logged in to submit a review.', 'error');

      return;
    }

    this.isLoggedIn = true;

    if (this.message.trim().length < 5 || this.rating === 0) {
      this.showCustomAlert('Please give a rating and write a valid message.', 'error');
      return;
    }

    const reviewData: CreateReview = {
      comment: this.message,
      rating: this.rating
    };

    this.reviewService.addReview(reviewData).subscribe({
      next: (response) => {
        console.log('Review submitted!', response);
        this.showCustomAlert('Thank you for your review!', 'success');
        this.rating = 0;
        this.message = '';
      },
      error: (err) => {
        console.error('Error submitting review:', err);

        if (err.status === 401) {
          this.showCustomAlert('You must be logged in to submit a review.', 'error');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);

        } else {
          this.showCustomAlert(err.error.message || 'Failed to submit review.', 'error');
        }
      }
    });
  }


  showCustomAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }


}
