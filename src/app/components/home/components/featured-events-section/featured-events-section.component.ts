import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from './components/event-card/event-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronLeft, heroChevronRight } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/language/language.service';
import { EventService } from '../../../../services/event/event.service';
import { Event } from '../../../../models/event.model';

@Component({
  selector: 'app-featured-events-section',
  imports: [CommonModule, EventCardComponent, NgIcon, TranslateModule],
  templateUrl: './featured-events-section.component.html',
  providers: [provideIcons({ heroChevronRight, heroChevronLeft })],
})
export class FeaturedEventsSectionComponent implements OnInit {
  currentLang: 'en' | 'ar' = 'en';
  constructor(
    private router: Router,
    private languageService: LanguageService,
    private eventService: EventService
  ) {
    const lang = this.languageService.getCurrentLanguage();
    this.currentLang = lang;
  }
  featuredEvents: Event[] = [];

  ngOnInit() {
    this.eventService.getFeaturedEvents().subscribe({
      next: (response) => {
        this.featuredEvents = response.data;
        console.log('Featured events fetched:', this.featuredEvents);
      },
      error: (err) => {
        console.error('Failed to fetch featured events:', err);
      },
    });
  }
  viewAllEvents() {
    this.router.navigate(['/events']);
  }
}
