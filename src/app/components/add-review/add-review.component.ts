import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-review',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './add-review.component.html',
})
export class AddReviewComponent {
  review: string = '';

  // Add the rating property to store the selected rating
  rating: number = 0;

  setRating(star: number): void {
    this.rating = star;
  }

  submitReview() {
    if (this.review.trim()) {
      console.log('Review Submitted:', this.review);
      // You can handle the submission logic here (e.g., send to API, store locally, etc.)
    } else {
      console.log('Please write a review before submitting.');
    }
  }
}
