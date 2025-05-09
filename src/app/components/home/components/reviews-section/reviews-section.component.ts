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
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/language/language.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reviews-section',
  imports: [CommonModule, NgIcon, TranslateModule],
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
  currentLang: 'en' | 'ar' = 'en';

  constructor(
    private reviewService: ReviewService,
    private languageService: LanguageService,
    private sanitizer: DomSanitizer

  ) {
    const lang = this.languageService.getCurrentLanguage();
    this.currentLang = lang;
  }

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (response) => {
        this.reviews = response.data.map((review: { userId: any; user: any; }) => {
          const user = review.userId || review.user;
          const avatarUrl = this.getAvatarUrl(user);
          console.log('Avatar URL:', avatarUrl, 'User:', user);

          return {
            ...review,
            user,
            profileImageUrl: avatarUrl
          };
        });
      },
      error: (err) => {
        console.error('Failed to fetch reviews:', err);
      }
    });
  }


  getAvatarUrl(user: any): string {
    if (user?.photo) return user.photo;

    const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    const encoded = encodeURIComponent(fullName || 'User');
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encoded}`;
  }


  scrollLeft(slider: HTMLElement) {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(slider: HTMLElement) {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
