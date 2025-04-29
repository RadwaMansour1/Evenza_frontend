import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { heroStar } from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  matArrowBackIosNew,
  matArrowForwardIos,
} from '@ng-icons/material-icons/baseline';
import { ReviewService } from '../../../../services/review/review.service';

@Component({
  selector: 'app-reviews-section',
  imports: [CommonModule, NgIcon],
  templateUrl: './reviews-section.component.html',
  providers: [
    provideIcons({
      heroStar,
      heroStarSolid,
      matArrowBackIosNew,
      matArrowForwardIos,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class ReviewsSectionComponent implements OnInit {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (response) => {
        this.reviews = response.data;
        console.log('Reviews fetched:', this.reviews);
      },
      error: (err) => {
        console.error('Failed to fetch reviews:', err);
      }
    });
  }

  scrollLeft(slider: HTMLElement) {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(slider: HTMLElement) {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
