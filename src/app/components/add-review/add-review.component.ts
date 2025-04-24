import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftRight, heroPaperAirplane} from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-review',
  imports: [NgIcon, CommonModule, FormsModule, TranslateModule],
  templateUrl: './add-review.component.html',
  providers: [
    provideIcons({ heroChatBubbleLeftRight, heroPaperAirplane})
  ]
})
export class AddReviewComponent {
  rating = 0;
  hoverRating = 0;
  message = '';

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
    if (this.message.trim().length < 5) {
      alert('Please enter at least 5 characters of feedback.');
      return;
    }

    console.log('Feedback submitted:', {
      rating: this.rating,
      message: this.message
    });

    this.rating = 0;
    this.message = '';
    alert('Thank you for your feedback!');
  }
}
